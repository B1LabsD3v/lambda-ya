#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TYPES = {
  handlers:
    'Un handler principal en src/handlers + capas (repository/service). Entry: index.ts reexporta handler.',
  modular:
    'Handler HTTP en index.ts + módulos en src/handlers, services, repositories (estilo hexagonal ligero).',
};

function slugify(input) {
  const s = String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^_+|_+$/g, '')
    .replace(/^-+|-+$/g, '');
  return s.length > 0 ? s : 'lambda-app';
}

function npmNameFromFolder(folderName) {
  const base = path.basename(path.resolve(folderName));
  const s = slugify(base).replace(/-/g, '-');
  return s.length > 0 ? s : 'lambda-app';
}

function printHelp() {
  console.log(`
lambda-ya — scaffold de Lambdas TypeScript (handlers | modular), alineado a lambda-scaffold-examples.

Publicado en npm / uso global:
  npx lambda-ya@latest list
  npx lambda-ya@latest handlers mi-svc --yes --no-terraform
  npm i -g lambda-ya && lambda-ya modular mi-api --yes --no-terraform

Desde un clon local de este repo:
  node bin/lambda-ya.js handlers ./mi-svc --yes --no-terraform
  npm link   # luego: lambda-ya ...

Uso:
  lambda-ya list
  lambda-ya help
  lambda-ya create <handlers|modular> <carpeta-destino>
  lambda-ya <handlers|modular> <carpeta-destino>

Opciones:
  --skip-install              No ejecuta npm install
  --yes                       No interactivo: defaults en prompts
  --terraform                 Incluye __iac__/ y deploy con Terraform
  --no-terraform              Solo bin/package-lambda.sh (build + zip, sin AWS/Terraform)
  --aws-profile=<perfil>      Perfil AWS CLI (Terraform)
  --aws-account-id=<id>       Cuenta AWS para tfvars (placeholder si se omite)
  --function-name=<nombre>    Nombre lógico de la función Lambda / Terraform
  --description=<texto>       package.json description
  --author=<texto>            package.json author
  --main-handler-file=<file>  Solo handlers: archivo en src/handlers (default: main.handler.ts)
  --main-handler-export=<id>  Solo handlers: nombre del export (default: mainHandler)

Ejemplos:
  lambda-ya handlers mi-svc --yes --no-terraform --skip-install
  lambda-ya modular mi-api --yes --terraform --aws-profile=dev --function-name=my-api-fn
`);
}

function parseArgs(argv) {
  const flags = new Set();
  const kv = new Map();
  const positional = [];
  for (const a of argv) {
    if (a === '--skip-install') flags.add('skip-install');
    else if (a === '--yes' || a === '-y') flags.add('yes');
    else if (a === '--terraform') flags.add('terraform');
    else if (a === '--no-terraform') flags.add('no-terraform');
    else if (a.startsWith('--') && a.includes('=')) {
      const [k, ...rest] = a.slice(2).split('=');
      kv.set(k, rest.join('='));
    } else positional.push(a);
  }
  return { flags, kv, positional };
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function applyVars(content, vars) {
  let out = content;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v == null ? '' : String(v));
  }
  return out;
}

async function copyTemplateTree(srcDir, destDir, vars) {
  if (!(await pathExists(srcDir))) return;
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const from = path.join(srcDir, ent.name);
    let destName = applyVars(ent.name, vars);
    const to = path.join(destDir, destName);
    if (ent.isDirectory()) {
      await copyTemplateTree(from, to, vars);
    } else {
      let content = await fs.readFile(from, 'utf8');
      content = applyVars(content, vars);
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.writeFile(to, content, 'utf8');
    }
  }
}

async function assertEmptyTargetDir(targetDir) {
  if (!(await pathExists(targetDir))) return;
  const stat = await fs.stat(targetDir);
  if (!stat.isDirectory()) {
    throw new Error(`"${targetDir}" existe y no es una carpeta.`);
  }
  const files = await fs.readdir(targetDir);
  if (files.length > 0) {
    throw new Error(`La carpeta destino no está vacía: ${targetDir}`);
  }
}

async function promptLine(rl, question, defaultValue) {
  const hint = defaultValue != null && defaultValue !== '' ? ` [${defaultValue}]` : '';
  const ans = (await rl.question(`${question}${hint}: `)).trim();
  return ans.length > 0 ? ans : defaultValue ?? '';
}

function boolFromAnswer(s, defaultVal) {
  const t = String(s).trim().toLowerCase();
  if (!t) return defaultVal;
  if (['s', 'si', 'y', 'yes', 'true', '1'].includes(t)) return true;
  if (['n', 'no', 'false', '0'].includes(t)) return false;
  return defaultVal;
}

const argv = process.argv.slice(2);
const { flags, kv, positional } = parseArgs(argv);

if (positional.length === 0 || positional[0] === 'help' || positional[0] === '--help' || positional[0] === '-h') {
  printHelp();
  process.exit(0);
}

if (positional[0] === 'list') {
  console.log('Tipos de scaffold:\n');
  for (const [k, v] of Object.entries(TYPES)) {
    console.log(`  ${k}\n    ${v}\n`);
  }
  process.exit(0);
}

let type;
let folderArg;

if (positional[0] === 'create') {
  type = positional[1];
  folderArg = positional[2];
} else if (Object.prototype.hasOwnProperty.call(TYPES, positional[0]) && positional[1]) {
  type = positional[0];
  folderArg = positional[1];
} else {
  console.error('Comando no reconocido. Usa: lambda-ya help');
  process.exit(1);
}

if (!type || !folderArg) {
  console.error('Falta tipo o carpeta. Ejemplo: lambda-ya handlers mi-proyecto');
  process.exit(1);
}

if (!Object.prototype.hasOwnProperty.call(TYPES, type)) {
  console.error(`Tipo desconocido: "${type}". Ejecuta: lambda-ya list`);
  process.exit(1);
}

const targetDir = path.resolve(folderArg);
const interactive = process.stdin.isTTY && process.stdout.isTTY && !flags.has('yes');

/** @type {boolean | undefined} */
let useTerraform;
let awsProfile = process.env.AWS_PROFILE || 'default';
let awsAccountId = 'REPLACE_ME_ACCOUNT_ID';
let functionName = npmNameFromFolder(folderArg);
let description = `Lambda ${functionName} (${type})`;
let author = '';
let mainHandlerFile = 'main.handler.ts';
let mainHandlerExport = 'mainHandler';

if (flags.has('terraform') && flags.has('no-terraform')) {
  console.error('No puedes combinar --terraform y --no-terraform.');
  process.exit(1);
}

if (flags.has('terraform')) useTerraform = true;
else if (flags.has('no-terraform')) useTerraform = false;

if (kv.has('aws-profile')) awsProfile = kv.get('aws-profile');
if (kv.has('aws-account-id')) awsAccountId = kv.get('aws-account-id');
if (kv.has('function-name')) functionName = kv.get('function-name');
if (kv.has('description')) description = kv.get('description');
if (kv.has('author')) author = kv.get('author');
if (kv.has('main-handler-file')) mainHandlerFile = kv.get('main-handler-file');
if (kv.has('main-handler-export')) mainHandlerExport = kv.get('main-handler-export');

if (interactive) {
  const rl = readline.createInterface({ input, output });
  try {
    functionName = await promptLine(rl, 'Nombre lógico de la función (Terraform / logs)', functionName);
    if (useTerraform === undefined) {
      const tfAns = await promptLine(rl, '¿Usar Terraform en __iac__? (s/n)', 'n');
      useTerraform = boolFromAnswer(tfAns, false);
    }
    if (useTerraform) {
      awsProfile = await promptLine(rl, 'Perfil AWS CLI (provider "profile")', awsProfile);
      awsAccountId = await promptLine(rl, 'AWS account id (o deja REPLACE_ME_ACCOUNT_ID)', awsAccountId);
    }
    description = await promptLine(rl, 'Descripción (package.json)', description);
    author = await promptLine(rl, 'Autor (package.json, opcional)', author);
    if (type === 'handlers') {
      mainHandlerFile = await promptLine(rl, 'Archivo principal en src/handlers', mainHandlerFile);
      mainHandlerExport = await promptLine(rl, 'Nombre del export en ese archivo', mainHandlerExport);
    }
  } finally {
    rl.close();
  }
}

if (useTerraform === undefined) {
  useTerraform = false;
}

const name = npmNameFromFolder(folderArg);
const lambdaName = functionName;
const mainHandlerStem = mainHandlerFile.replace(/\.ts$/i, '');

const vars = {
  name,
  lambdaName,
  function_name: functionName,
  aws_profile: awsProfile,
  aws_account_id: awsAccountId,
  description,
  author,
  keywords_json: JSON.stringify(['lambda', 'aws-lambda', lambdaName]),
  main_handler_export: mainHandlerExport,
  main_handler_stem: mainHandlerStem,
  main_handler_file: mainHandlerFile,
};

const templateRoot = path.join(__dirname, '..', 'templates', type);
const sharedDir = path.join(templateRoot, '_shared');
const branchDir = useTerraform ? path.join(templateRoot, '_with_tf') : path.join(templateRoot, '_no_tf');

try {
  await assertEmptyTargetDir(targetDir);
} catch (e) {
  console.error(String(e.message || e));
  process.exit(1);
}

if (!(await pathExists(sharedDir))) {
  console.error(`Plantilla incompleta: falta ${sharedDir}`);
  process.exit(1);
}

console.log(`Creando scaffold "${type}" en ${targetDir}`);
console.log(`  Terraform: ${useTerraform ? 'sí' : 'no (solo zip vía bin/package-lambda.sh)'}`);
if (type === 'handlers') {
  console.log(`  Handler principal: src/handlers/${mainHandlerFile} export ${mainHandlerExport}`);
}

try {
  await fs.mkdir(targetDir, { recursive: true });
  await copyTemplateTree(sharedDir, targetDir, vars);
  await copyTemplateTree(branchDir, targetDir, vars);

  if (type === 'handlers' && mainHandlerFile !== 'main.handler.ts') {
    const from = path.join(targetDir, 'src', 'handlers', 'main.handler.ts');
    const to = path.join(targetDir, 'src', 'handlers', mainHandlerFile);
    if (await pathExists(from)) {
      await fs.rename(from, to);
    }
  }

  if (!flags.has('skip-install')) {
    process.chdir(targetDir);
    execSync('npm install', { stdio: 'inherit' });
  }

  console.log('Listo.');
  console.log(`  cd ${path.relative(process.cwd(), targetDir) || '.'}`);
  console.log('  npm run build');
  if (!flags.has('skip-install')) {
    console.log(useTerraform ? '  bash __iac__/bin/deploy.sh   # build + zip + terraform apply' : '  bash bin/package-lambda.sh   # build + zip (sin Terraform)');
  }
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
