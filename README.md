<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>Small CLI to scaffold AWS Lambda projects in TypeScript — <code>handlers</code> and <code>modular</code> layouts, AWS SDK for JavaScript v3 only, optional Terraform under <code>__iac__/</code>.</strong>
  <br />
  <em>Works well with Cursor and other AI coding assistants when generating projects.</em>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="READMEs/README.es.md">Español</a> |
  <a href="READMEs/README.pt-BR.md">Português (Brasil)</a> |
  <a href="READMEs/README.zh-CN.md">简体中文</a> |
  <a href="READMEs/README.zh-TW.md">繁體中文</a> |
  <a href="READMEs/README.ja.md">日本語</a> |
  <a href="READMEs/README.ko.md">한국어</a>
</p>

<p align="center">
  <a href="#quick-start"><img src="https://img.shields.io/badge/Quick_start-0366d6" alt="Quick start" /></a>
  <a href="https://www.npmjs.com/package/lambda-ya"><img src="https://img.shields.io/npm/v/lambda-ya?label=npm&logo=npm" alt="npm version" /></a>
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License: ISC" /></a>
  <a href="https://github.com/b1labs/lambda-ya"><img src="https://img.shields.io/badge/GitHub-181717?logo=github" alt="GitHub" /></a>
  <a href="https://github.com/b1labs/lambda-ya/issues"><img src="https://img.shields.io/github/issues/b1labs/lambda-ya" alt="Issues" /></a>
  <a href="https://github.com/sponsors/crisd3v"><img src="https://img.shields.io/badge/Sponsor-30363D?logo=GitHub-Sponsors" alt="Sponsor" /></a>
</p>

<p align="center">
  <img src="assets/hero.png" alt="lambda-ya — Scaffold AWS Lambda TypeScript projects (handlers and modular layouts, optional Terraform)" width="800" />
</p>

<p align="center">
  <small>The <a href="CHANGELOG.md">CHANGELOG</a> is <strong>English-only</strong>.</small>
</p>

---

- **`handlers`**: `index.ts` re-exports a single primary handler from `src/handlers/`.
- **`modular`**: `index.ts` implements the Lambda HTTP entrypoint and delegates to `src/handlers`, `src/services`, and `src/repositories`.

Templates use **AWS SDK for JavaScript v3** (`@aws-sdk/*`) only. You can optionally generate **Terraform** under `__iac__/`.

## Requirements

- **Node.js 18+** (20+ recommended)
- npm 9+

<a id="quick-start"></a>

## Quick start

### From npm (any directory on your machine)

After the package is published:

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers my-service --yes --no-terraform
npx lambda-ya@latest modular my-api --yes --terraform --aws-profile=myprofile --aws-account-id=123456789012
```

Global install:

```bash
npm install -g lambda-ya
lambda-ya handlers my-service --yes --no-terraform
```

### From a local clone of this repo

```bash
cd path/to/lambda-ya
node bin/lambda-ya.js handlers path/to/output/my-service --yes --no-terraform
# or after: npm link
lambda-ya modular ~/projects/my-api --yes --no-terraform
```

## Commands

| Command | Description |
|---------|-------------|
| `lambda-ya help` | Show help |
| `lambda-ya list` | List scaffold types (`handlers`, `modular`) |
| `lambda-ya <type> <folder>` | Create scaffold in `folder` |
| `lambda-ya create <type> <folder>` | Same as above |

Common flags: `--yes`, `--terraform` / `--no-terraform`, `--api-gateway=v1|v2`, `--aws-profile=`, `--aws-account-id=`, `--function-name=`, `--main-handler-file=`, `--main-handler-export=`, `--skip-install`.

## Terraform vs zip-only

- **`--terraform`**: copies `__iac__/` and `__iac__/bin/deploy.sh` (build + zip + `terraform apply`). Cursor **Terraform/IAM** commands live under `.cursor/` in this branch only.
- **`--no-terraform`**: copies `bin/package-lambda.sh` at the project root (build + `lambda.zip` only). No Terraform-related Cursor commands are added.

## Publishing (maintainers)

1. Bump `version` in [package.json](package.json) and update [CHANGELOG.md](CHANGELOG.md) (English).
2. `npm publish` (for a public scoped package: `npm publish --access public`).
3. Ensure `files` in `package.json` includes everything you need (`bin/`, `templates/`, `READMEs/`, `assets/`, etc.).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository layout

- `bin/lambda-ya.js` — CLI entry.
- `templates/<type>/_shared/` — shared generated project files.
- `templates/<type>/_with_tf/` — Terraform + deploy script + Terraform-related Cursor assets.
- `templates/<type>/_no_tf/` — `bin/package-lambda.sh` (zip artifact only).

## License

ISC — see [LICENSE.md](LICENSE.md) and [package.json](package.json).

## Funding

This project lists funding metadata in `package.json` and [.github/FUNDING.yml](.github/FUNDING.yml). Update sponsor links to match your organization.
