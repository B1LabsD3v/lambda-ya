import { response } from "@core/core.utils";
import { pingExampleHandler } from "@handlers/hl_example/ping.handler";
import { AuthenticationError, NotFoundError, ValidationError } from "@types_/services.type";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * AWS Lambda entrypoint (**modular** layout).
 *
 * - In AWS, set the Lambda handler to `dist/index.handler`.
 * - This file owns the HTTP contract (API Gateway HTTP API v2) and delegates domain work
 *   to modules under `src/handlers`, `src/services`, and `src/repositories`.
 *
 * Recommended flow:
 * 1. Add routes or use cases under `src/handlers/...`.
 * 2. Keep `index.ts` thin: logging, try/catch, and mapping errors to HTTP responses.
 *
 * Sample route: `GET /health` → `pingExampleHandler`.
 */
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("{{function_name}} invoked", {
    path: event.rawPath,
    method: event.requestContext?.http?.method ?? "UNKNOWN",
    requestId: event.requestContext?.requestId,
  });

  try {
    if (event.rawPath === "/health" || event.requestContext?.http?.path === "/health") {
      const data = await pingExampleHandler(event);
      return response(200, { message: "ok", data });
    }

    return response(404, { error: "Not Found", path: event.rawPath });
  } catch (error) {
    console.error("Error processing request", { error });

    if (error instanceof ValidationError) {
      return response(400, { error: "Validation Error", message: error.message });
    }
    if (error instanceof AuthenticationError) {
      return response(401, { error: "Authentication Error", message: error.message });
    }
    if (error instanceof NotFoundError) {
      return response(404, { error: "Not Found", message: error.message });
    }

    return response(500, { error: "Internal Server Error", message: "Unexpected error" });
  }
};
