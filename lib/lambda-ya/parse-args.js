// @ts-check
/**
 * POSIX-style argv parsing for boolean flags and `--key=value` pairs.
 *
 * @module lambda-ya/parse-args
 */

/**
 * @param {string[]} argv Typically `process.argv.slice(2)`.
 * @returns {import('./types.js').ParsedArgs}
 */
export function parseArgs(argv) {
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
