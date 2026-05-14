<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>AWS Lambda용 TypeScript 프로젝트를 CLI로 생성합니다. <code>handlers</code>와 <code>modular</code> 두 가지 레이아웃. 템플릿은 AWS SDK for JavaScript v3만 사용하며 선택적으로 <code>__iac__/</code>에 Terraform을 생성할 수 있습니다.</strong>
  <br />
  <em>Cursor 등 AI 코딩 어시스턴트와 함께 프로젝트를 만들 때 잘 맞습니다.</em>
</p>

<p align="center">
  <a href="../README.md">English</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
  <a href="README.ja.md">日本語</a> |
  한국어
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
  <img src="../assets/hero.png" alt="lambda-ya — Scaffold AWS Lambda TypeScript projects (handlers and modular layouts, optional Terraform)" width="800" />
</p>

<p align="center">
  <small><a href="../CHANGELOG.md">변경 로그</a>는 영어만 제공됩니다.</small>
</p>

---

## 요구 사항

- **Node.js 18+** (20+ 권장)
- npm 9+

<a id="quick-start"></a>

## 빠른 시작

### 패키지가 npm에 게시된 후

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers my-service --yes --no-terraform
npx lambda-ya@latest modular my-api --yes --terraform --aws-profile=myprofile --aws-account-id=123456789012
```

### 전역 설치

```bash
npm i -g lambda-ya
lambda-ya handlers my-service --yes --no-terraform
```

### 로컬 클론에서

```bash
node bin/lambda-ya.js handlers ./out/my-svc --yes --no-terraform
npm link   # 이후 lambda-ya 직접 실행
```

## 명령어

| 명령 | 설명 |
|------|------|
| `lambda-ya help` | 도움말 |
| `lambda-ya list` | `handlers`, `modular` 표시 |
| `lambda-ya <유형> <폴더>` | 스캐폴드 생성 |
| `lambda-ya create <유형> <폴더>` | 동일 |

주요 플래그: `--yes`, `--terraform` / `--no-terraform`, `--api-gateway=v1|v2`, `--aws-profile=`, `--aws-account-id=`, `--function-name=`, `--main-handler-file=`, `--main-handler-export=`, `--skip-install`.

## Terraform vs zip만

- **`--terraform`**: `__iac__/` 및 `__iac__/bin/deploy.sh` 생성. 이 모드에서만 Terraform/IAM 관련 Cursor 명령·규칙이 복사됩니다.
- **`--no-terraform`**: 루트 `bin/package-lambda.sh`(빌드 + `lambda.zip`). Terraform용 Cursor 명령은 **추가하지 않습니다**.

## 기여 및 배포

- 기여 가이드(영어): [CONTRIBUTING.md](../CONTRIBUTING.md)
- 배포: `package.json` 버전과 [CHANGELOG.md](../CHANGELOG.md)를 갱신한 뒤 `npm publish`.

## 라이선스

ISC — [LICENSE.md](../LICENSE.md) 및 [package.json](../package.json) 참고.

## 후원

`package.json`과 [.github/FUNDING.yml](../.github/FUNDING.yml)의 링크를 실제 후원 채널에 맞게 수정하세요.
