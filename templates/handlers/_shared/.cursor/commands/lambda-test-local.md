# Command: Generate or update `__test__/test-local.js` (and optional JSON event)

You are helping the developer run this Lambda **locally** against the compiled entrypoint. The scaffold defaults to **CommonJS** output and `index.ts` exporting `handler`, so the local runner typically uses Node’s `require`.

## Goal

Produce (or refine) `__test__/test-local.js` so that:

1. It loads the built handler from `../dist/index.js` (adjust only if the project’s build output or module system differs).
2. It constructs a realistic **AWS event** object for the integration surface this Lambda uses (API Gateway HTTP API v2, REST v1, WebSocket, SQS, etc.).
3. It invokes `handler(event)` (or the correct export name if the entrypoint differs), logs the result, and exits non-zero on thrown errors.

Optionally add `__test__/event-example.json` and load it with `fs.readFileSync` + `JSON.parse` if the payload is large or reused across tests.

## Preconditions (tell the user if missing)

- Run `npm run build` so `dist/` exists and matches what AWS will execute.
- Confirm which handler signature is exported from `index.ts` (usually `APIGatewayProxyHandlerV2` for HTTP API v2 in this scaffold).

## Discovery questionnaire (ask in chat before editing files)

Ask only what you need; default sensible values when the user says “use defaults”.

1. **Trigger type**: HTTP API v2, REST (v1), WebSocket (`$connect` / `$disconnect` / custom), SQS, SNS, EventBridge scheduled/custom, DynamoDB Streams, S3, other.
2. **HTTP specifics** (if applicable): `method`, `rawPath` or path, `pathParameters`, `queryStringParameters`, important `headers`, `body` (raw string vs JSON), `isBase64Encoded`.
3. **Auth** (if applicable): JWT/Cognito authorizer shape under `requestContext.authorizer` (which `claims` does the code read: `sub`, `email`, custom attributes?).
4. **Stage / env**: `stageVariables` (e.g. `STAGE_MODE`), or environment variables the handler reads at cold start.
5. **Expected outcome**: success path only vs also testing error branches (4xx/5xx, partial batch failures for SQS, etc.).

## Implementation contract

- Use **Node CommonJS** in `__test__/test-local.js` unless the generated project clearly uses ESM for `dist/index.js` (then use dynamic `import()` and top-level async main).
- Standard pattern:

```js
const { handler } = require("../dist/index.js");

async function main() {
  const result = await handler(testEvent);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- Keep field names and nesting aligned with **AWS Lambda event types** from `@types/aws-lambda` for the chosen trigger.
- If the handler returns API Gateway-style `statusCode` / `body`, log them clearly for quick visual checks.

## Minimal shape reminders (do not invent AWS-internal IDs)

- **HTTP API v2**: `version: "2.0"`, `routeKey`, `rawPath`, `requestContext.http`, `headers`, `pathParameters`, `body`, `isBase64Encoded`, optional `stageVariables`.
- **REST v1**: use `APIGatewayProxyEvent` layout (`httpMethod`, `path`, `multiValueHeaders`, etc.).
- **WebSocket**: `requestContext.connectionId`, route key / domain as appropriate for the code under test.
- **SQS**: `Records` array with `messageId`, `body`, `attributes`, `messageAttributes`; if the code returns `batchItemFailures`, build the test to assert that shape.

## Optional `event-example.json`

- Place a canonical payload in `__test__/event-example.json`.
- In `test-local.js`, load it and pass to `handler`. Document one line in a comment: `node __test__/test-local.js`.

## Validation checklist (before you finish)

- [ ] `npm run build` succeeds with the new/updated test file unchanged in TypeScript sources (tests live under `__test__`, excluded from `tsc` include if applicable).
- [ ] Running `node __test__/test-local.js` does not throw for the happy path.
- [ ] Event shape matches imports/types used in `index.ts` / `src/handlers/**`.
- [ ] No secrets (tokens, passwords) committed in the event file; use placeholders.
