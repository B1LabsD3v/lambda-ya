/**
 * Run the compiled Lambda handler with a sample HTTP API v2 event (`GET /health`).
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
  console.log(JSON.stringify(await handler(testEvent), null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
