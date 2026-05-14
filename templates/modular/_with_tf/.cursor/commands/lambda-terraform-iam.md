# Command: Generate or update IAM policies from application code (Terraform)

You align **IAM permissions** in this repo’s Terraform (`__iac__/`) with what the Lambda **actually does** in TypeScript, using **AWS SDK for JavaScript v3** only.

## Scope

- Read: `src/**/*.ts` and root `index.ts` if it performs I/O (in the modular layout, `index.ts` is usually HTTP-only; most SDK calls live under `src/services/**` and `src/repositories/**`).
- Write / propose: `__iac__/**/*.tf`, primarily `lambda.tf` for inline policies or attachments; extend `variables.tf` and `terraform.tfvars` when new ARNs or resource names are required.

## Hard constraints

- **Never** add or suggest the legacy v2 SDK (`aws-sdk` package).
- Prefer **least privilege** for `Action` and `Resource`.
- Use **`var.aws_account_id`** and **`var.aws_region`** inside ARNs when building resource strings.

## Analysis algorithm (follow in order)

1. **Inventory SDK clients** from `@aws-sdk/client-*` and `@aws-sdk/lib-dynamodb` imports across `src/`.
2. **Inventory commands** (`GetCommand`, `QueryCommand`, `PutObjectCommand`, etc.) and the **resource identifiers** passed into each command.
3. **Map each call to IAM actions** on the correct ARN patterns (tables, indexes, buckets, queues, secrets).
4. **Implement policies in Terraform** (`aws_iam_role_policy` or managed policy attachments) consistent with the existing module style in `lambda.tf`.
5. **Add variables + tfvars** for any new identifiers; never commit secrets.
6. **Suggest** `terraform fmt` and `terraform plan` after changes.

## Deliverables

- Patches to `.tf` files with policies matching the code.  
- A concise mapping: SDK usage → IAM actions → resources.  
- Note to rebuild/deploy after IAM updates.
