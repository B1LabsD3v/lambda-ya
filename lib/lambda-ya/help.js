// @ts-check
/**
 * Long-form `--help` text for the CLI.
 *
 * @module lambda-ya/help
 */

/** Prints usage, flags, and examples to stdout. */
export function printHelp() {
  console.log(`
lambda-ya — TypeScript AWS Lambda scaffolds (handlers | modular).

Published / global:
  npx lambda-ya@latest list
  npx lambda-ya@latest handlers my-svc --yes --no-terraform
  npm i -g lambda-ya && lambda-ya modular my-api --yes --no-terraform

From a local clone of this repo:
  node bin/lambda-ya.js handlers ./my-svc --yes --no-terraform
  npm link   # then: lambda-ya ...

Usage:
  lambda-ya list
  lambda-ya help
  lambda-ya create <handlers|modular> <dest-folder>
  lambda-ya <handlers|modular> <dest-folder>

Options:
  --skip-install              Skip npm install in the generated project
  --yes                       Non-interactive: accept defaults for prompts
  --terraform                 Include __iac__/ and Terraform deploy script
  --no-terraform              Only bin/package-lambda.sh (build + zip, no Terraform)
  --aws-profile=<name>        AWS CLI profile (Terraform)
  --aws-account-id=<id>       AWS account id for tfvars (placeholder if omitted)
  --function-name=<name>      Logical Lambda / Terraform function name
  --description=<text>        package.json description
  --author=<text>             package.json author
  --main-handler-file=<file>  handlers only: file under src/handlers (default: main.handler.ts)
  --main-handler-export=<id>  handlers only: export name (default: mainHandler)

Examples:
  lambda-ya handlers my-svc --yes --no-terraform --skip-install
  lambda-ya modular my-api --yes --terraform --aws-profile=dev --function-name=my-api-fn
`);
}
