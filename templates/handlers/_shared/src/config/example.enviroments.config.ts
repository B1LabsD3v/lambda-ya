/**
 * EXAMPLE — how to centralize configuration per stage.
 *
 * - Copy patterns from here into `enviroments.config.ts`.
 * - Read `process.env.*` only in this layer (not directly in handlers) and validate values.
 *
 * With AWS SDK v3, build table names or ARNs here and pass them into repositories.
 */
export function exampleReadEnv(name: string, fallback?: string): string {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required env var: ${name}`);
}
