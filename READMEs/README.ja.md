<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>AWS Lambda 向けの TypeScript プロジェクトを CLI で生成します。<code>handlers</code> と <code>modular</code> の 2 レイアウト。テンプレートは AWS SDK for JavaScript v3 のみを使用し、必要に応じて <code>__iac__/</code> 以下に Terraform を生成できます。</strong>
  <br />
  <em>Cursor などの AI コーディング支援と相性が良い構成です。</em>
</p>

<p align="center">
  <a href="../README.md">English</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  日本語 |
  <a href="README.ko.md">한국어</a>
</p>

<p align="center">
  <a href="#quick-start"><img src="https://img.shields.io/badge/Quick_start-0366d6" alt="Quick start" /></a>
  <a href="https://www.npmjs.com/package/lambda-ya"><img src="https://img.shields.io/npm/v/lambda-ya?label=npm&logo=npm" alt="npm version" /></a>
  <a href="../LICENSE.md"><img src="https://img.shields.io/badge/License-ISC-blue.svg" alt="License: ISC" /></a>
  <a href="https://github.com/b1labs/lambda-ya"><img src="https://img.shields.io/badge/GitHub-181717?logo=github" alt="GitHub" /></a>
  <a href="https://github.com/b1labs/lambda-ya/issues"><img src="https://img.shields.io/github/issues/b1labs/lambda-ya" alt="Issues" /></a>
  <a href="https://github.com/sponsors/crisd3v"><img src="https://img.shields.io/badge/Sponsor-30363D?logo=GitHub-Sponsors" alt="Sponsor" /></a>
</p>

<p align="center">
  <a href="https://star-history.com/#b1labs/lambda-ya&amp;Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=b1labs/lambda-ya&amp;type=Date&amp;theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=b1labs/lambda-ya&amp;type=Date" />
      <img alt="Star history chart" src="https://api.star-history.com/svg?repos=b1labs/lambda-ya&amp;type=Date" />
    </picture>
  </a>
</p>

<p align="center">
  <img src="../assets/hero.png" alt="lambda-ya — Scaffold AWS Lambda TypeScript projects (handlers and modular layouts, optional Terraform)" width="800" />
</p>

<p align="center">
  <small><a href="../CHANGELOG.md">変更履歴</a>は英語のみです。</small>
</p>

---

## 要件

- **Node.js 18+**（20+ 推奨）
- npm 9+

<a id="quick-start"></a>

## クイックスタート

### パッケージ公開後

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers my-service --yes --no-terraform
npx lambda-ya@latest modular my-api --yes --terraform --aws-profile=myprofile --aws-account-id=123456789012
```

### グローバルインストール

```bash
npm i -g lambda-ya
lambda-ya handlers my-service --yes --no-terraform
```

### ローカルクローンから

```bash
node bin/lambda-ya.js handlers ./out/my-svc --yes --no-terraform
npm link   # 以降 lambda-ya を直接実行可能
```

## コマンド

| コマンド | 説明 |
|----------|------|
| `lambda-ya help` | ヘルプ |
| `lambda-ya list` | `handlers` / `modular` を表示 |
| `lambda-ya <type> <dir>` | 指定フォルダに生成 |
| `lambda-ya create <type> <dir>` | 同上 |

主なフラグ: `--yes`, `--terraform` / `--no-terraform`, `--aws-profile=`, `--aws-account-id=`, `--function-name=`, `--main-handler-file=`, `--main-handler-export=`, `--skip-install`。

## Terraform と zip のみ

- **`--terraform`**: `__iac__/` と `__iac__/bin/deploy.sh` を生成。このモードのみ Terraform/IAM 向けの Cursor コマンド・ルールをコピーします。
- **`--no-terraform`**: ルートの `bin/package-lambda.sh`（ビルド + `lambda.zip`）。Terraform 向け Cursor コマンドは **追加しません**。

## コントリビュート / リリース

- ガイド（英語）: [CONTRIBUTING.md](../CONTRIBUTING.md)
- リリース: `package.json` のバージョンと [CHANGELOG.md](../CHANGELOG.md) を更新し、`npm publish`。

## ライセンス

ISC — [LICENSE.md](../LICENSE.md) と [package.json](../package.json) を参照。

## 資金提供

`package.json` と [.github/FUNDING.yml](../.github/FUNDING.yml) を実際のスポンサー情報に合わせて更新してください。
