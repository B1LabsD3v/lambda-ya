/**
 * Run the compiled Lambda handler with a minimal **API Gateway HTTP API (v2)** event.
 *
 * Generated when you scaffold with `--api-gateway=v2` (default). Copied to `test-local.js` during scaffold.
 *
 * Usage:
 *   npm run build
 *   node __test__/test-local.js
 */
const { handler } = require("../dist/index.js");

const testEvent = {
  version: "2.0",
  routeKey: "GET /health",
  rawPath: "/health",
  rawQueryString: "",
  headers: { "content-type": "application/json" },
  requestContext: {
    accountId: "000000000000",
    apiId: "local",
    domainName: "localhost",
    domainPrefix: "local",
    http: { method: "GET", path: "/health", protocol: "HTTP/1.1", sourceIp: "127.0.0.1", userAgent: "test" },
    requestId: "local-request",
    routeKey: "GET /health",
    stage: "dev",
    time: new Date().toISOString(),
    timeEpoch: Date.now(),
  },
  stageVariables: { STAGE_MODE: "DEV_" },
  isBase64Encoded: false,
};

async function main() {
  console.log("Running local test (API Gateway v2 HTTP API)...\n");
  const result = await handler(testEvent);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
