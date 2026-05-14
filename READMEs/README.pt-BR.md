<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>CLI para gerar projetos AWS Lambda em TypeScript com dois layouts: <code>handlers</code> e <code>modular</code>. Os templates usam AWS SDK for JavaScript v3 e, opcionalmente, Terraform em <code>__iac__/</code>.</strong>
  <br />
  <em>Funciona bem com Cursor e outros assistentes de código com IA ao gerar projetos.</em>
</p>

<p align="center">
  <a href="../README.md">English</a> |
  <a href="README.es.md">Español</a> |
  Português (Brasil) |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.zh-TW.md">繁體中文</a> |
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
  <small><a href="../CHANGELOG.md">CHANGELOG</a> somente em inglês.</small>
</p>

---

## Requisitos

- Node.js **18+** (recomendado 20+)
- npm 9+

<a id="quick-start"></a>

## Início rápido

### Depois de publicar o pacote

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers meu-servico --yes --no-terraform
npx lambda-ya@latest modular minha-api --yes --terraform --aws-profile=meuperfil --aws-account-id=123456789012
```

### Instalação global

```bash
npm i -g lambda-ya
lambda-ya handlers meu-servico --yes --no-terraform
```

### A partir de um clone local

```bash
node bin/lambda-ya.js handlers ./saida/meu-svc --yes --no-terraform
npm link   # depois: lambda-ya ...
```

## Comandos

| Comando | Descrição |
|--------|------------|
| `lambda-ya help` | Ajuda |
| `lambda-ya list` | Tipos `handlers`, `modular` |
| `lambda-ya <tipo> <pasta>` | Cria o scaffold |
| `lambda-ya create <tipo> <pasta>` | Igual |

Flags comuns: `--yes`, `--terraform` / `--no-terraform`, `--aws-profile=`, `--aws-account-id=`, `--function-name=`, `--main-handler-file=`, `--main-handler-export=`, `--skip-install`.

## Terraform vs apenas zip

- Com **`--terraform`**: gera `__iac__/` e `__iac__/bin/deploy.sh`. Comandos Cursor de Terraform/IAM **somente** neste modo.
- Com **`--no-terraform`**: gera `bin/package-lambda.sh` (build + `lambda.zip`). **Sem** comandos Cursor de Terraform.

## Contribuição e publicação

- [CONTRIBUTING.md](../CONTRIBUTING.md) (inglês)
- Publicação: atualize `version`, [CHANGELOG.md](../CHANGELOG.md), rode `npm publish`.

## Licença

ISC — veja [LICENSE.md](../LICENSE.md) e [package.json](../package.json).

## Financiamento

Veja `package.json` e [.github/FUNDING.yml](../.github/FUNDING.yml); ajuste os links de patrocínio.
