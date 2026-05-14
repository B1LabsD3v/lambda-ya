/**
 * EXAMPLE — service layer (orchestration / business rules).
 *
 * - Handlers call functions exported from `@services`.
 * - Services call `@infrastructure` repositories and apply validation rules.
 *
 * @example
 * ```ts
 * import { describeExample } from "@services/s_example/example.service";
 * const msg = await describeExample("DEV_");
 * ```
 */
import { resolveTableName } from "@config/enviroments.config";
import { getExampleItem } from "@infrastructure/r_example/example.repository";

export async function describeExample(stageMode: string | undefined): Promise<string> {
  const table = resolveTableName(stageMode);
  const item = await getExampleItem(table, "PK#demo", "SK#demo");
  return item ? `found ${item.PK}` : `no item (table ${table})`;
}
