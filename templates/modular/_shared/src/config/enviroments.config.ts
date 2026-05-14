const BASE_TABLE_NAME = "{{name}}_items";

export function resolveTableName(stageMode: string | undefined): string {
  const prefix = stageMode ?? "DEV_";
  return `${prefix}${BASE_TABLE_NAME}`;
}
