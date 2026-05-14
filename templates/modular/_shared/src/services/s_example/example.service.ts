/**
 * EXAMPLE — `@services` layer (rules / orchestration).
 *
 * Typical flow:
 * - Handlers (`@handlers`) call exported functions from this folder.
 * - Services call `@repositories` and enforce business validation.
 *
 * @example
 * ```ts
 * import { exampleDescribeTable } from "@services/s_example/example.service";
 * const t = await exampleDescribeTable("DEV_");
 * ```
 */
import { resolveTableName } from "@config/enviroments.config";
import { getExampleItem } from "@repositories/r_example/example.repository";

export async function exampleDescribeTable(stageMode: string | undefined): Promise<string> {
  const table = resolveTableName(stageMode);
  await getExampleItem(table, "PK#demo", "SK#demo");
  return table;
}
