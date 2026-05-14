import { parseBody, response } from "@core/core.utils";
import type { {{lambda_handler_type}} } from "aws-lambda";

/**
 * Primary handler for this Lambda (**handlers** layout).
 *
 * Use `response` and `parseBody` from `@core/core.utils` for JSON responses and bodies.
 * For DynamoDB or other AWS calls, use **only** AWS SDK for JavaScript v3 (`@aws-sdk/client-*`).
 *
 * **API Gateway:** scaffolded for `{{api_gateway_version}}` (`{{lambda_event_type}}`).
 */
export const {{main_handler_export}}: {{lambda_handler_type}} = async (event) => {
  console.log("{{function_name}} invoked", {
    {{log_fields}}
  });

  const body = event.body ? parseBody<Record<string, unknown>>(event) : {};

  return response(200, {
    ok: true,
    functionName: "{{function_name}}",
    path: {{event_path_access}},
    parsedBodyKeys: Object.keys(body),
  });
};
