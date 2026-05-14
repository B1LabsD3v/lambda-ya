/**
 * Shared JSDoc typedefs for the lambda-ya CLI (no runtime exports).
 *
 * @module lambda-ya/types
 */

/**
 * CLI argument buckets after flag parsing.
 * @typedef {Object} ParsedArgs
 * @property {Set<string>} flags Boolean-style flags (e.g. `yes`, `skip-install`, `terraform`).
 * @property {Map<string, string>} kv Key/value pairs from `--key=value`.
 * @property {string[]} positional Positional tokens (subcommand, type, folder, …).
 */

/**
 * Supported scaffold layouts bundled with this package.
 * @typedef {'handlers'|'modular'} ScaffoldType
 */

/**
 * String substitution map for `{{key}}` placeholders in template paths and file bodies.
 * @typedef {Record<string, string | number | boolean | null | undefined>} TemplateVars
 */

/**
 * API Gateway event family for generated handlers (`APIGatewayProxy*` vs `APIGatewayProxy*V2`).
 * @typedef {'v1'|'v2'} ApiGatewayVersion
 */

export {};
