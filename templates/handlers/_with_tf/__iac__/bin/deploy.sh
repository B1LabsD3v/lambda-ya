#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$(dirname "$ROOT_DIR")"
DIST_DIR="$BACKEND_DIR/dist"
ZIP_PATH="$BACKEND_DIR/lambda.zip"

echo "Building TypeScript Lambda..."
cd "$BACKEND_DIR"
npm ci
rm -rf "$DIST_DIR"
npm run build
npm prune --production

echo "Creating zip package..."
rm -f "$ZIP_PATH"
cp -r "$BACKEND_DIR/node_modules" "$DIST_DIR/node_modules"
cd "$DIST_DIR"
zip -r "$ZIP_PATH" .

echo "Deploying with Terraform..."
cd "$ROOT_DIR"
terraform init
terraform apply -auto-approve

echo "Done."
