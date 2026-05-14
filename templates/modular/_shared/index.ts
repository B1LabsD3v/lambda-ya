import { response } from "@core/core.utils";
import { AuthenticationError, NotFoundError, ValidationError } from "@types_/services.type";
import type { {{lambda_handler_type}} } from "aws-lambda";

/**
 * AWS Lambda entrypoint (**modular** layout).
 *
 * - In AWS, set the Lambda handler to `dist/index.handler`.
 * - This file owns the HTTP contract (API Gateway **{{api_gateway_version}}**: `{{lambda_event_type}}`) and delegates domain work
 *   to modules under `src/handlers`, `src/services`, and `src/repositories`.
 *
 * Recommended flow:
 * 1. Add routes or use cases under `src/handlers/...`.
 * 2. Keep `index.ts` thin: logging, try/catch, and mapping errors to HTTP responses.
 *
 * `GET /health` is implemented inline so the project builds without compiling `example.example.*` reference files.
 */
export const handler: {{lambda_handler_type}} = async (event) => {
  console.log("{{function_name}} invoked", {
    {{log_fields}}
  });

  try {
    if ({{health_route_condition}}) {
      return response(200, { message: "ok", status: "healthy" });
    }

    return response(404, { error: "Not Found", path: {{event_path_access}} });
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
