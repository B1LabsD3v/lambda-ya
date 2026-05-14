// @ts-check
/**
 * Small filesystem helpers for scaffold target validation.
 *
 * @module lambda-ya/fs-utils
 */

import fs from 'fs/promises';

/**
 * @param {import('node:fs').PathLike} p
 * @returns {Promise<boolean>}
 */
export async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensures `targetDir` is absent or an empty directory.
 *
 * @param {string} targetDir Absolute or resolved path.
 * @throws {Error} If the path exists and is not an empty directory.
 * @returns {Promise<void>}
 */
export async function assertEmptyTargetDir(targetDir) {
  if (!(await pathExists(targetDir))) return;
  const stat = await fs.stat(targetDir);
  if (!stat.isDirectory()) {
    throw new Error(`"${targetDir}" exists and is not a directory.`);
  }
  const files = await fs.readdir(targetDir);
  if (files.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }
}
