// @ts-check
/**
 * Folder-name helpers for default package / function naming.
 *
 * @module lambda-ya/slug
 */

import path from 'path';

/**
 * Lowercase slug with hyphens, safe for npm-style names.
 *
 * @param {unknown} input
 * @returns {string}
 */
export function slugify(input) {
  const s = String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^_+|_+$/g, '')
    .replace(/^-+|-+$/g, '');
  return s.length > 0 ? s : 'lambda-app';
}

/**
 * Default package basename from a destination folder path.
 *
 * @param {string} folderName Path or folder name passed on the CLI.
 * @returns {string}
 */
export function npmNameFromFolder(folderName) {
  const base = path.basename(path.resolve(folderName));
  const s = slugify(base).replace(/-/g, '-');
  return s.length > 0 ? s : 'lambda-app';
}
