<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>用於從命令列建立 AWS Lambda TypeScript 專案樣板的 CLI：提供 <code>handlers</code> 與 <code>modular</code> 兩種結構；樣板僅使用 AWS SDK for JavaScript v3，並可選擇產生 <code>__iac__/</code> 下的 Terraform。</strong>
  <br />
  <em>與 Cursor 等 AI 程式助手搭配建立專案十分合適。</em>
</p>

<p align="center">
  <a href="../README.md">English</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  繁體中文 |
  <a href="README.ja.md">日本語</a> |
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
  <small><a href="../CHANGELOG.md">變更紀錄</a>僅提供英文。</small>
</p>

---

## 環境需求

- **Node.js 18+**（建議 20+）
- npm 9+

<a id="quick-start"></a>

## 快速開始

### 套件發布後

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers my-service --yes --no-terraform
npx lambda-ya@latest modular my-api --yes --terraform --aws-profile=myprofile --aws-account-id=123456789012
```

### 全域安裝

```bash
npm i -g lambda-ya
lambda-ya handlers my-service --yes --no-terraform
```

### 在本機 clone 後

```bash
node bin/lambda-ya.js handlers ./out/my-svc --yes --no-terraform
npm link   # 之後可直接執行 lambda-ya ...
```

## 指令

| 指令 | 說明 |
|------|------|
| `lambda-ya help` | 說明 |
| `lambda-ya list` | 列出類型：`handlers`、`modular` |
| `lambda-ya <類型> <資料夾>` | 在指定資料夾建立樣板 |
| `lambda-ya create <類型> <資料夾>` | 同上 |

常用參數：`--yes`、`--terraform` / `--no-terraform`、`--aws-profile=`、`--aws-account-id=`、`--function-name=`、`--main-handler-file=`、`--main-handler-export=`、`--skip-install`。

## Terraform 與僅 zip

- **`--terraform`**：產生 `__iac__/` 與 `__iac__/bin/deploy.sh`。僅此模式會複製與 Terraform/IAM 相關的 Cursor 指令與規則。
- **`--no-terraform`**：產生根目錄 `bin/package-lambda.sh`（建置並產生 `lambda.zip`）。**不會**加入 Terraform 相關 Cursor 指令。

## 貢獻與發佈

- 貢獻指南（英文）：[CONTRIBUTING.md](../CONTRIBUTING.md)
- 發佈：更新 `package.json` 版本與 [CHANGELOG.md](../CHANGELOG.md)，執行 `npm publish`。

## 授權

ISC — 見 [LICENSE.md](../LICENSE.md) 與 [package.json](../package.json)。

## 贊助

見 `package.json` 與 [.github/FUNDING.yml](../.github/FUNDING.yml)，請依實際情況調整連結。
