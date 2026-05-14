# Changelog

All notable changes to **lambda-ya** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.1.0] — 2026-05-14

### Added

- CLI: `--api-gateway=v1|v2` (REST API vs HTTP API) with template vars for `APIGatewayProxyHandler` / `APIGatewayProxyHandlerV2`; interactive prompt when not using `--yes`.
- Templates: example code moved to `example.example.*` files and `*_example.example/` folders, excluded from `tsc`; modular `index.ts` uses inline `/health` (no imports from example tree); `__test__/test-local.v1.js` / `test-local.v2.js` merged into `test-local.js` at scaffold time.
- CI: matrix builds handlers and modular for both API Gateway versions.

## [1.0.0] — 2026-05-14

### Added

- `lambda-ya` CLI with `handlers` and `modular` scaffold types.
- Template layout: `_shared`, `_with_tf`, `_no_tf`.
- Interactive prompts and flags (`--yes`, `--terraform`, `--no-terraform`, etc.).
- Cursor commands for local tests; Terraform/IAM Cursor assets only in Terraform scaffolds.
- AWS SDK for JavaScript v3 in generated projects.

[Unreleased]: https://github.com/B1LabsD3v/lambda-ya/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/B1LabsD3v/lambda-ya/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/B1LabsD3v/lambda-ya/releases/tag/v1.0.0
