/**
 * Shared helpers.
 *
 * Add reusable pure helpers here. Avoid coupling this module to AWS SDKs.
 */
export const response = (status: number, body: object) => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});

export const parseBody = <T = Record<string, unknown>>(event: { body?: string | null }): T => {
  if (!event.body) return {} as T;
  try {
    return typeof event.body === "string" ? (JSON.parse(event.body) as T) : (event.body as T);
  } catch {
    throw new Error("Invalid JSON body");
  }
};
