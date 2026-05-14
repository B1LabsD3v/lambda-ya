/**
 * EXAMPLE — how to document shared domain types and DTOs.
 *
 * - Place interfaces shared by handlers, services, and repositories.
 * - Import from `@types_/example.types` or colocate in `db.types` / `services.type`.
 *
 * @example
 * ```ts
 * import type { ExampleDto } from "@types_/example.types";
 * const dto: ExampleDto = { id: "1", label: "demo" };
 * ```
 */
export interface ExampleDto {
  id: string;
  label: string;
}
