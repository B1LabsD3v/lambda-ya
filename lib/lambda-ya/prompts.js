// @ts-check
/**
 * Interactive readline prompts for TTY sessions.
 *
 * @module lambda-ya/prompts
 */

/**
 * @param {import('readline/promises').Interface} rl
 * @param {string} question
 * @param {string} [defaultValue]
 * @returns {Promise<string>}
 */
export async function promptLine(rl, question, defaultValue) {
  const hint = defaultValue != null && defaultValue !== '' ? ` [${defaultValue}]` : '';
  const ans = (await rl.question(`${question}${hint}: `)).trim();
  return ans.length > 0 ? ans : defaultValue ?? '';
}

/**
 * Parses yes/no answers (English and common Spanish shorthands). Unknown tokens return `defaultVal`.
 *
 * Truthy: `y`, `yes`, `true`, `1`, `s`, `si`
 * Falsy: `n`, `no`, `false`, `0`
 *
 * @param {string} s
 * @param {boolean} defaultVal
 * @returns {boolean}
 */
export function boolFromAnswer(s, defaultVal) {
  const t = String(s).trim().toLowerCase();
  if (!t) return defaultVal;
  if (['s', 'si', 'y', 'yes', 'true', '1'].includes(t)) return true;
  if (['n', 'no', 'false', '0'].includes(t)) return false;
  return defaultVal;
}
