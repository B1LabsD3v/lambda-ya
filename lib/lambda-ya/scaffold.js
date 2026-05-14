// @ts-check
/**
 * Core scaffold orchestration: template paths, substitution, optional rename, npm install.
 *
 * @module lambda-ya/scaffold
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { SCAFFOLD_TYPES } from './constants.js';
import { assertEmptyTargetDir, pathExists } from './fs-utils.js';
import { boolFromAnswer, promptLine } from './prompts.js';
import { npmNameFromFolder } from './slug.js';
import { copyTemplateTree } from './template-engine.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Repository root (parent of `lib/`). */
const PKG_ROOT = path.join(__dirname, '..', '..');

/**
 * @param {string | undefined} raw
 * @returns {import('./types.js').ApiGatewayVersion}
 */
function parseApiGatewayVersion(raw) {
  const v = String(raw ?? '')
    .trim()
    .toLowerCase();
  if (v === '' || v === 'v2' || v === '2') return 'v2';
  if (v === 'v1' || v === '1') return 'v1';
  throw new Error(`Invalid --api-gateway value: "${raw}". Use v1 (REST API) or v2 (HTTP API).`);
}

/**
 * @param {import('./types.js').ApiGatewayVersion} version
 * @returns {Record<string, string>}
 */
function apiGatewayTemplateVars(version) {
  if (version === 'v1') {
    return {
      api_gateway_version: 'v1',
      lambda_handler_type: 'APIGatewayProxyHandler',
      lambda_event_type: 'APIGatewayProxyEvent',
      health_route_condition: 'event.path === "/health"',
      event_path_access: 'event.path',
      log_fields: `path: event.path,
    method: event.httpMethod,
    requestId: event.requestContext.requestId,`,
    };
  }
  return {
    api_gateway_version: 'v2',
    lambda_handler_type: 'APIGatewayProxyHandlerV2',
    lambda_event_type: 'APIGatewayProxyEventV2',
    health_route_condition:
      'event.rawPath === "/health" || event.requestContext?.http?.path === "/health"',
    event_path_access: 'event.rawPath',
    log_fields: `path: event.rawPath,
    method: event.requestContext?.http?.method ?? "UNKNOWN",
    requestId: event.requestContext.requestId,`,
  };
}

/**
 * Picks `test-local.v{1|2}.js` from the scaffold and writes `test-local.js`.
 *
 * @param {string} targetDir
 * @param {import('./types.js').ApiGatewayVersion} apiVersion
 * @returns {Promise<void>}
 */
async function finalizeTestLocalScript(targetDir, apiVersion) {
  const testDir = path.join(targetDir, '__test__');
  const v1 = path.join(testDir, 'test-local.v1.js');
  const v2 = path.join(testDir, 'test-local.v2.js');
  const dest = path.join(testDir, 'test-local.js');
  if (!(await pathExists(v1)) || !(await pathExists(v2))) return;
  const pick = apiVersion === 'v1' ? v1 : v2;
  await fs.copyFile(pick, dest);
  await fs.unlink(v1);
  await fs.unlink(v2);
}

/**
 * @typedef {Object} ExecuteScaffoldOptions
 * @property {import('./types.js').ScaffoldType} type
 * @property {string} folderArg Destination path as given on the CLI.
 * @property {Set<string>} flags
 * @property {Map<string, string>} kv
 * @property {boolean} interactive Whether readline prompts may run.
 */

/**
 * Generates a project from bundled templates under `templates/<type>/`.
 *
 * @param {ExecuteScaffoldOptions} opts
 * @returns {Promise<void>}
 */
export async function executeScaffold(opts) {
  const { type, folderArg, flags, kv, interactive } = opts;

  if (flags.has('terraform') && flags.has('no-terraform')) {
    console.error('Cannot combine --terraform and --no-terraform.');
    process.exit(1);
  }

  /** @type {boolean | undefined} */
  let useTerraform;
  if (flags.has('terraform')) useTerraform = true;
  else if (flags.has('no-terraform')) useTerraform = false;

  let awsProfile = process.env.AWS_PROFILE || 'default';
  let awsAccountId = 'REPLACE_ME_ACCOUNT_ID';
  let functionName = npmNameFromFolder(folderArg);
  let description = `Lambda ${functionName} (${type})`;
  let author = '';
  let mainHandlerFile = 'main.handler.ts';
  let mainHandlerExport = 'mainHandler';

  /** @type {import('./types.js').ApiGatewayVersion | undefined} */
  let apiGatewayVersion;

  if (kv.has('aws-profile')) awsProfile = /** @type {string} */ (kv.get('aws-profile'));
  if (kv.has('aws-account-id')) awsAccountId = /** @type {string} */ (kv.get('aws-account-id'));
  if (kv.has('function-name')) functionName = /** @type {string} */ (kv.get('function-name'));
  if (kv.has('description')) description = /** @type {string} */ (kv.get('description'));
  if (kv.has('author')) author = /** @type {string} */ (kv.get('author'));
  if (kv.has('main-handler-file')) mainHandlerFile = /** @type {string} */ (kv.get('main-handler-file'));
  if (kv.has('main-handler-export')) mainHandlerExport = /** @type {string} */ (kv.get('main-handler-export'));
  if (kv.has('api-gateway')) {
    try {
      apiGatewayVersion = parseApiGatewayVersion(kv.get('api-gateway'));
    } catch (e) {
      console.error(e instanceof Error ? e.message : String(e));
      process.exit(1);
    }
  }

  if (interactive) {
    const rl = readline.createInterface({ input, output });
    try {
      functionName = await promptLine(
        rl,
        'Logical function name (Terraform / logs)',
        functionName,
      );
      if (useTerraform === undefined) {
        const tfAns = await promptLine(rl, 'Use Terraform under __iac__? (y/n)', 'n');
        useTerraform = boolFromAnswer(tfAns, false);
      }
      if (useTerraform) {
        awsProfile = await promptLine(rl, 'AWS CLI profile (Terraform provider "profile")', awsProfile);
        awsAccountId = await promptLine(
          rl,
          'AWS account id (or leave REPLACE_ME_ACCOUNT_ID)',
          awsAccountId,
        );
      }
      description = await promptLine(rl, 'package.json description', description);
      author = await promptLine(rl, 'package.json author (optional)', author);
      if (apiGatewayVersion === undefined) {
        const ag = await promptLine(
          rl,
          'API Gateway payload: v1 = REST API (classic), v2 = HTTP API (default v2)',
          'v2',
        );
        try {
          apiGatewayVersion = parseApiGatewayVersion(ag || 'v2');
        } catch (e) {
          console.error(e instanceof Error ? e.message : String(e));
          process.exit(1);
        }
      }
      if (type === 'handlers') {
        mainHandlerFile = await promptLine(
          rl,
          'Primary handler file under src/handlers',
          mainHandlerFile,
        );
        mainHandlerExport = await promptLine(
          rl,
          'Export name in that file',
          mainHandlerExport,
        );
      }
    } finally {
      rl.close();
    }
  }

  if (useTerraform === undefined) {
    useTerraform = false;
  }

  if (apiGatewayVersion === undefined) {
    apiGatewayVersion = 'v2';
  }

  const name = npmNameFromFolder(folderArg);
  const lambdaName = functionName;
  const mainHandlerStem = mainHandlerFile.replace(/\.ts$/i, '');

  /** @type {import('./types.js').TemplateVars} */
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
    ...apiGatewayTemplateVars(apiGatewayVersion),
  };

  const targetDir = path.resolve(folderArg);
  const templateRoot = path.join(PKG_ROOT, 'templates', type);
  const sharedDir = path.join(templateRoot, '_shared');
  const branchDir = useTerraform
    ? path.join(templateRoot, '_with_tf')
    : path.join(templateRoot, '_no_tf');

  try {
    await assertEmptyTargetDir(targetDir);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(msg);
    process.exit(1);
  }

  if (!(await pathExists(sharedDir))) {
    console.error(`Incomplete template bundle: missing ${sharedDir}`);
    process.exit(1);
  }

  console.log(`Creating "${type}" scaffold at ${targetDir}`);
  console.log(
    `  Terraform: ${useTerraform ? 'yes' : 'no (zip only via bin/package-lambda.sh)'}`,
  );
  console.log(`  API Gateway: ${apiGatewayVersion} (${apiGatewayVersion === 'v1' ? 'REST API' : 'HTTP API'})`);
  if (type === 'handlers') {
    console.log(`  Primary handler: src/handlers/${mainHandlerFile} (export ${mainHandlerExport})`);
  }

  const cwdBefore = process.cwd();

  try {
    await fs.mkdir(targetDir, { recursive: true });
    await copyTemplateTree(sharedDir, targetDir, vars);
    await copyTemplateTree(branchDir, targetDir, vars);

    await finalizeTestLocalScript(targetDir, apiGatewayVersion);

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

    console.log('Done.');
    console.log(`  cd ${path.relative(process.cwd(), targetDir) || '.'}`);
    console.log('  npm run build');
    if (!flags.has('skip-install')) {
      console.log(
        useTerraform
          ? '  bash __iac__/bin/deploy.sh   # build + zip + terraform apply'
          : '  bash bin/package-lambda.sh   # build + zip (no Terraform)',
      );
    }
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  } finally {
    try {
      process.chdir(cwdBefore);
    } catch {
      /* ignore chdir errors */
    }
  }
}

/** @returns {import('./types.js').ScaffoldType[]} */
export function listScaffoldTypeIds() {
  return /** @type {import('./types.js').ScaffoldType[]} */ (Object.keys(SCAFFOLD_TYPES));
}

/**
 * @param {string} id
 * @returns {id is import('./types.js').ScaffoldType}
 */
export function isScaffoldType(id) {
  return Object.prototype.hasOwnProperty.call(SCAFFOLD_TYPES, id);
}
