/**
 * Run the compiled Lambda handler with a minimal **API Gateway REST API (v1)** proxy event.
 *
 * Generated when you scaffold with `--api-gateway=v1`. Copied to `test-local.js` during scaffold.
 *
 * Usage:
 *   npm run build
 *   node __test__/test-local.js
 */
const { handler } = require("../dist/index.js");

const testEvent = {
  resource: "/health",
  path: "/health",
  httpMethod: "GET",
  headers: { "Content-Type": "application/json" },
  multiValueHeaders: {},
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: "000000000000",
    apiId: "local",
    requestId: "local-request",
    stage: "dev",
    resourcePath: "/health",
    httpMethod: "GET",
    path: "/health",
    protocol: "HTTP/1.1",
    requestTimeEpoch: Date.now(),
    identity: {
      sourceIp: "127.0.0.1",
      userAgent: "test",
    },
  },
  body: null,
  isBase64Encoded: false,
};

async function main() {
  console.log("Running local test (API Gateway v1 REST)...\n");
  const result = await handler(testEvent);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
