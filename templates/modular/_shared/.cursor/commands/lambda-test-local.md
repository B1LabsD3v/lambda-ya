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
- Confirm which handler signature is exported from `index.ts` (this modular scaffold uses `APIGatewayProxyHandlerV2` at the root `handler` by default).

## Discovery questionnaire (ask in chat before editing files)

Ask only what you need; default sensible values when the user says “use defaults”.

1. **Trigger type**: HTTP API v2, REST (v1), WebSocket, SQS, SNS, EventBridge, other.
2. **HTTP specifics** (if applicable): `method`, `rawPath`, `pathParameters`, `queryStringParameters`, `headers`, `body`, `isBase64Encoded`.
3. **Auth** (if applicable): JWT/Cognito claims under `requestContext.authorizer` that `src/handlers/**` or `index.ts` actually reads.
4. **Stage / env**: `stageVariables` (e.g. `STAGE_MODE`) used by `@config` or handlers.
5. **Route under test**: which `rawPath` / `routeKey` should hit the branch in `index.ts` (this template ships a `/health` example).

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

- Align the payload with `@types/aws-lambda` for the chosen trigger.
- Prefer extending the existing `__test__/event-example.json` when present instead of duplicating large JSON inline.

## Validation checklist (before you finish)

- [ ] `npm run build` succeeds.
- [ ] `node __test__/test-local.js` runs without throw on the happy path.
- [ ] Event fields match what `index.ts` and `src/handlers/**` consume.
- [ ] No secrets in committed JSON; placeholders only.
