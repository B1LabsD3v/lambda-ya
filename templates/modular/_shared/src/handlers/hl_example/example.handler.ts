/**
 * EXAMPLE — modular handler pattern (`src/handlers/**`).
 *
 * - Export small async functions for domain or orchestration logic.
 * - Import services from `@services/...` and types from `@types_/...`.
 * - Call them from `index.ts` based on route or `routeKey`.
 */
import type { APIGatewayProxyEventV2 } from "aws-lambda";

export async function exampleBusinessHandler(_event: APIGatewayProxyEventV2): Promise<{ ok: true }> {
  return { ok: true };
}
