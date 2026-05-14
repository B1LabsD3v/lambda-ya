/**
 * Resolve resource names or prefixes per stage (e.g. DynamoDB table names).
 *
 * Adjust `BASE_TABLE_NAME` and prefix rules to match your domain.
 * For secrets and URLs, prefer environment variables (see `.env.example`).
 */
const BASE_TABLE_NAME = "{{name}}_items";

export function resolveTableName(stageMode: string | undefined): string {
  const prefix = stageMode ?? "DEV_";
  return `${prefix}${BASE_TABLE_NAME}`;
}
