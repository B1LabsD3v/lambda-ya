import { parseBody, response } from "@core/core.utils";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * Primary handler for this Lambda (**handlers** layout).
 *
 * Use `response` and `parseBody` from `@core/core.utils` for JSON responses and bodies.
 * For DynamoDB or other AWS calls, use **only** AWS SDK for JavaScript v3 (`@aws-sdk/client-*`).
 */
export const {{main_handler_export}}: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("{{function_name}} invoked", {
    path: event.rawPath,
    requestId: event.requestContext?.requestId,
  });

  const body = event.body ? parseBody<Record<string, unknown>>(event) : {};

  return response(200, {
    ok: true,
    functionName: "{{function_name}}",
    path: event.rawPath,
    parsedBodyKeys: Object.keys(body),
  });
};
