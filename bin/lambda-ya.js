#!/usr/bin/env node
/**
 * Executable shim for the lambda-ya CLI. Implementation lives under `lib/lambda-ya/`.
 *
 * @see ../lib/lambda-ya/cli.js
 */

import { runCli } from '../lib/lambda-ya/cli.js';

runCli().catch((err) => {
  console.error(err);
  process.exit(1);
});
