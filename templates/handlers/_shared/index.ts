/**
 * AWS Lambda entrypoint.
 *
 * - In AWS, set the Lambda handler to `dist/index.handler` (compiled TypeScript).
 * - This file only re-exports the primary handler implemented under `src/handlers/`.
 *
 * **Handlers** layout: one primary handler file plus supporting layers under `src/`.
 *
 * @see `src/handlers/{{main_handler_file}}` — implements `{{main_handler_export}}`.
 */
export { {{main_handler_export}} as handler } from "src/handlers/{{main_handler_stem}}";
