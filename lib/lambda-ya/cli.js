// @ts-check
/**
 * CLI entry: argv routing, help/list, and scaffold dispatch.
 *
 * @module lambda-ya/cli
 */

import { SCAFFOLD_TYPES } from './constants.js';
import { printHelp } from './help.js';
import { parseArgs } from './parse-args.js';
import { executeScaffold, isScaffoldType, listScaffoldTypeIds } from './scaffold.js';

/**
 * Parses `process.argv`, runs the matching subcommand, and terminates the process.
 *
 * @returns {Promise<void>}
 */
export async function runCli() {
  const argv = process.argv.slice(2);
  const { flags, kv, positional } = parseArgs(argv);

  if (
    positional.length === 0 ||
    positional[0] === 'help' ||
    positional[0] === '--help' ||
    positional[0] === '-h'
  ) {
    printHelp();
    process.exit(0);
  }

  if (positional[0] === 'list') {
    console.log('Scaffold types:\n');
    for (const k of listScaffoldTypeIds()) {
      console.log(`  ${k}\n    ${SCAFFOLD_TYPES[k]}\n`);
    }
    process.exit(0);
  }

  /** @type {string | undefined} */
  let type;
  /** @type {string | undefined} */
  let folderArg;

  if (positional[0] === 'create') {
    type = positional[1];
    folderArg = positional[2];
  } else if (positional[0] && isScaffoldType(positional[0]) && positional[1]) {
    type = positional[0];
    folderArg = positional[1];
  } else {
    console.error('Unknown command. Run: lambda-ya help');
    process.exit(1);
  }

  if (!type || !folderArg) {
    console.error('Missing type or folder. Example: lambda-ya handlers my-project');
    process.exit(1);
  }

  if (!isScaffoldType(type)) {
    console.error(`Unknown scaffold type: "${type}". Run: lambda-ya list`);
    process.exit(1);
  }

  const interactive =
    process.stdin.isTTY && process.stdout.isTTY && !flags.has('yes');

  await executeScaffold({
    type,
    folderArg,
    flags,
    kv,
    interactive,
  });
}
