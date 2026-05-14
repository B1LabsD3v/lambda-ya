/**
 * EXAMPLE — pattern for a file under `src/handlers/`.
 *
 * Typical workflow:
 * 1. Add a new file such as `my-use-case.handler.ts` and export an async function.
 * 2. If it is the **only** entrypoint, re-export it from `index.ts` (handlers layout)
 *    or call it from your primary handler.
 * 3. Keep the signature aligned with the trigger (e.g. `{{lambda_handler_type}}`).
 *
 * This file is excluded from `tsc` (see `tsconfig.json`); it is reference-only and is not wired into `index.ts` by default.
 */
import { parseBody, response } from "@core/core.utils";
import type { {{lambda_handler_type}} } from "aws-lambda";

export const exampleHttpHandler: {{lambda_handler_type}} = async (event) => {
  const payload = event.body ? parseBody(event) : {};
  return response(200, { example: true, payload });
};
