# Contributing to lambda-ya

Thanks for your interest in improving **lambda-ya**. This document is **English-only**; user-facing guides are available in multiple languages via [README.md](README.md).

## How to contribute

1. **Open an issue** first for larger changes (new scaffold type, breaking CLI changes).
2. **Fork** the repository and create a **feature branch** from `main`.
3. **Change templates** under `templates/handlers/` or `templates/modular/` (`_shared`, `_with_tf`, `_no_tf`).
4. **Change the CLI** in `bin/lambda-ya.js` when prompts, flags, or copy logic need updates.
5. **Verify locally**:
   - `node bin/lambda-ya.js handlers ./_tmp-verify --yes --no-terraform --skip-install`
   - `cd _tmp-verify && npm install && npm run build && node __test__/test-local.js`
   - Repeat for `modular` if you touched those templates.
6. **Update [CHANGELOG.md](CHANGELOG.md)** under `[Unreleased]` (English).
7. **Open a pull request** with a clear description and screenshots/log output if relevant.

## Coding conventions

- Generated Lambdas must use **AWS SDK for JavaScript v3** (`@aws-sdk/*`) only—no `aws-sdk` v2.
- Prefer `response` / `parseBody` from `@core/core.utils` in HTTP-style handlers.
- Keep placeholders consistent: `{{name}}`, `{{function_name}}`, etc.

## Release process (maintainers)

1. Bump `version` in `package.json`.
2. Move `[Unreleased]` items into a dated section in `CHANGELOG.md`.
3. `npm publish` (use `--access public` for scoped public packages).

If repository URLs in `package.json` / changelogs differ from your fork, update them before publishing.
