#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
ZIP_PATH="$ROOT_DIR/lambda.zip"

echo "Building TypeScript Lambda (no Terraform)..."
cd "$ROOT_DIR"
npm ci
rm -rf "$DIST_DIR"
npm run build
npm prune --production

echo "Creating lambda.zip (artifact only; no Terraform or AWS CLI calls)..."
rm -f "$ZIP_PATH"
cp -r "$ROOT_DIR/node_modules" "$DIST_DIR/node_modules"
cd "$DIST_DIR"
zip -r "$ZIP_PATH" .

echo "OK: $ZIP_PATH"
