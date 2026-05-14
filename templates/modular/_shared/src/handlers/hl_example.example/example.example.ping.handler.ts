import type { {{lambda_event_type}} } from "aws-lambda";
import { resolveTableName } from "@config/enviroments.config";

/**
 * EXAMPLE — sample domain handler (not imported by `index.ts`; excluded from `tsc`).
 *
 * By default this does **not** call AWS so `node __test__/test-local.js` works without credentials.
 * Add real persistence through `@services` / `@repositories` using AWS SDK for JavaScript v3 only.
 */
export async function pingExampleHandler(event: {{lambda_event_type}}): Promise<{ table: string; note: string }> {
  const stage = event.stageVariables?.STAGE_MODE;
  const table = resolveTableName(stage);
  return { table, note: "Add real calls through @repositories when you need persistence" };
}
