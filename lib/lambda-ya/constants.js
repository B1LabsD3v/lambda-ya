// @ts-check
/**
 * Built-in scaffold type metadata for `lambda-ya list`.
 *
 * @module lambda-ya/constants
 */

/** @type {Readonly<Record<import('./types.js').ScaffoldType, string>>} */
export const SCAFFOLD_TYPES = Object.freeze({
  handlers:
    'Single primary handler under src/handlers plus repository/service layers. index.ts re-exports the handler.',
  modular:
    'HTTP entry in index.ts delegating to src/handlers, src/services, and src/repositories (lightweight modular layout).',
});
