# Changelog

All notable changes to **lambda-ya** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

- CLI: split `bin/lambda-ya.js` into ESM modules under `lib/lambda-ya/` with JSDoc types; help, errors, and prompts are English-only.
- Add [LICENSE.md](LICENSE.md): ISC license, copyright B1LABS.
- README: centered “landing” header (title, tagline, language links, shields, star-history chart, hero); localized files under `READMEs/` share the same layout with `../assets/hero.png`; `## Quick start` anchor on all locales.
- Scaffold without Terraform: Cursor Terraform/IAM commands and rules are only copied when using the Terraform branch (`_with_tf`).
- Handler templates use `response` and `parseBody` from `@core/core.utils`.
- Package metadata: `engines`, `repository`, `bugs`, `homepage`, `funding`, expanded `files` for published docs.
- GitHub: `.github/FUNDING.yml`, `CONTRIBUTING.md`, and CI workflow to validate scaffolds.
- Cursor: English, expanded prompts for `lambda-test-local` and `lambda-terraform-iam`; Terraform rule descriptions in English.
- Templates: JSDoc and shell/terraform comments in generated projects are English; sample `note` strings in modular ping response are English.

## [1.0.0] — 2026-05-14

### Added

- `lambda-ya` CLI with `handlers` and `modular` scaffold types.
- Template layout: `_shared`, `_with_tf`, `_no_tf`.
- Interactive prompts and flags (`--yes`, `--terraform`, `--no-terraform`, etc.).
- Cursor commands for local tests; Terraform/IAM Cursor assets only in Terraform scaffolds.
- AWS SDK for JavaScript v3 in generated projects.

[Unreleased]: https://github.com/b1labs/lambda-ya/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/b1labs/lambda-ya/releases/tag/v1.0.0
