/**
 * EXAMPLE — centralize reading environment variables.
 *
 * Copy patterns into `enviroments.config.ts` and keep `process.env` access scoped to `@config`.
 */
export function exampleReadEnv(name: string, fallback?: string): string {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required env var: ${name}`);
}
