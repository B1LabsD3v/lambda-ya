/**
 * EXAMPLE — pattern for a file under `src/handlers/`.
 *
 * Typical workflow:
 * 1. Add a new file such as `my-use-case.handler.ts` and export an async function.
 * 2. If it is the **only** entrypoint, re-export it from `index.ts` (handlers layout)
 *    or call it from your primary handler.
 * 3. Keep the signature aligned with the trigger (e.g. `APIGatewayProxyHandlerV2`).
 *
 * This module is reference-only; it is not wired into `index.ts` by default.
 */
import { parseBody, response } from "@core/core.utils";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const exampleHttpHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const payload = event.body ? parseBody(event) : {};
  return response(200, { example: true, payload });
};
