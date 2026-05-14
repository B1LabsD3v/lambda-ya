/**
 * EXAMPLE — modular handler pattern (`src/handlers/**`).
 *
 * - Export small async functions for domain or orchestration logic.
 * - Import services from `@services/...` and types from `@types_/...`.
 * - Call them from `index.ts` based on route or `routeKey`.
 *
 * Excluded from `tsc` — reference only.
 */
import type { {{lambda_event_type}} } from "aws-lambda";

export async function exampleBusinessHandler(_event: {{lambda_event_type}}): Promise<{ ok: true }> {
  return { ok: true };
}
