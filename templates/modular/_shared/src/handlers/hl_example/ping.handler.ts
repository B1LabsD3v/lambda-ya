import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { resolveTableName } from "@config/enviroments.config";

/**
 * Sample domain handler for the modular layout.
 *
 * By default this does **not** call AWS so `node __test__/test-local.js` works without credentials.
 * Add real persistence through `@services` / `@repositories` using AWS SDK for JavaScript v3 only.
 */
export async function pingExampleHandler(event: APIGatewayProxyEventV2): Promise<{ table: string; note: string }> {
  const stage = event.stageVariables?.STAGE_MODE;
  const table = resolveTableName(stage);
  return { table, note: "Add real calls through @repositories when you need persistence" };
}
