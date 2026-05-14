# Command: Generate or update IAM policies from application code (Terraform)

You align **IAM permissions** in this repo’s Terraform (`__iac__/`) with what the Lambda **actually does** in TypeScript, using **AWS SDK for JavaScript v3** only.

## Scope

- Read: `src/**/*.ts` (and any shared `index.ts` at project root if it contains SDK calls—usually it should not).
- Write / propose: `__iac__/**/*.tf`, primarily `lambda.tf` for inline policies or attachments; extend `variables.tf` and `terraform.tfvars` when new ARNs, table names, or bucket names are required.

## Hard constraints

- **Never** add or suggest the legacy v2 SDK (`aws-sdk` package, `import AWS from "aws-sdk"`, etc.).
- Prefer **least privilege**: smallest set of `Action`s and most specific `Resource` ARNs.
- Use Terraform variables for account and region: **`var.aws_account_id`**, **`var.aws_region`** inside ARN strings where appropriate.

## Analysis algorithm (follow in order)

1. **Inventory SDK clients**  
   Scan imports: `@aws-sdk/client-*`, `@aws-sdk/lib-dynamodb`, `@aws-sdk/s3-request-presigner`, etc.  
   Note: `DynamoDBDocumentClient` uses the same underlying service **dynamodb** for IAM action names.

2. **Inventory API calls**  
   For each `client.send(new XxxCommand({...}))` (or equivalent), record:
   - Service namespace (e.g. `dynamodb`, `s3`, `sns`, `sqs`, `secretsmanager`).
   - High-level operation (e.g. `GetItem`, `Query`, `PutObject`, `Publish`, `GetSecretValue`).
   - Resources touched: table name, bucket name, topic ARN, secret ARN, stream ARN, etc.

3. **Map to IAM actions**  
   Build a table (mentally or in the PR description) from SDK usage → IAM `Action` strings. Examples:
   - DynamoDB `GetCommand` / `GetItem` → `dynamodb:GetItem`
   - DynamoDB `QueryCommand` → `dynamodb:Query` (and often `dynamodb:GetItem` is not enough)
   - DynamoDB `ScanCommand` → `dynamodb:Scan`
   - DynamoDB `UpdateCommand` / `PutCommand` / `DeleteCommand` → `dynamodb:UpdateItem`, `dynamodb:PutItem`, `dynamodb:DeleteItem`
   - S3 `GetObject` → `s3:GetObject` on `arn:aws:s3:::bucket` and `arn:aws:s3:::bucket/*` as needed
   - SQS `ReceiveMessage` / `DeleteMessage` / `SendMessage` → corresponding `sqs:*` actions on the queue ARN

4. **Design Terraform IAM**  
   - Prefer **`aws_iam_role_policy`** (inline) for small, function-specific policies **or** dedicated `aws_iam_policy` + `aws_iam_role_policy_attachment` if reuse is needed.  
   - Keep **`AWSLambdaBasicExecutionRole`** (or equivalent) for CloudWatch Logs if not already attached.  
   - Encode ARNs with `jsonencode` / `templatefile` patterns consistent with existing `lambda.tf`.

5. **Variables and tfvars**  
   - Any new table name, bucket name, or ARN suffix → add `variable` blocks with descriptions.  
   - Add commented or placeholder entries in `terraform.tfvars` showing example values **without** secrets.

6. **Quality gate**  
   - Suggest the user run `terraform fmt` and `terraform plan` from `__iac__/` after edits.  
   - Call out if the code uses wildcard scans or `Resource: "*"` requirements—justify or refactor the code instead if possible.

## Deliverables

- Concrete `.tf` edits (or a single new `iam.tf`) with policies reflecting the code.  
- Short summary listing: **detected SDK calls → IAM actions → resources**.  
- Reminder to rebuild `lambda.zip` / run deploy script after IAM changes.
