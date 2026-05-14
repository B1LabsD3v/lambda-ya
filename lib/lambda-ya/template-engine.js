// @ts-check
/**
 * Recursive copy with `{{var}}` substitution in file names and contents.
 *
 * @module lambda-ya/template-engine
 */

import fs from 'fs/promises';
import path from 'path';
import { pathExists } from './fs-utils.js';

/**
 * Replaces every `{{key}}` in `content` using string values from `vars`.
 *
 * @param {string} content
 * @param {import('./types.js').TemplateVars} vars
 * @returns {string}
 */
export function applyVars(content, vars) {
  let out = content;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v == null ? '' : String(v));
  }
  return out;
}

/**
 * Copies `srcDir` into `destDir`, applying `applyVars` to each file path segment and body.
 * Missing `srcDir` is a no-op (supports optional template branches).
 *
 * @param {string} srcDir
 * @param {string} destDir
 * @param {import('./types.js').TemplateVars} vars
 * @returns {Promise<void>}
 */
export async function copyTemplateTree(srcDir, destDir, vars) {
  if (!(await pathExists(srcDir))) return;
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const ent of entries) {
    const from = path.join(srcDir, ent.name);
    const destName = applyVars(ent.name, vars);
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
