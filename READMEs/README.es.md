<h1 align="center">lambda-ya</h1>

<p align="center">
  <strong>CLI para generar proyectos AWS Lambda en TypeScript con dos estilos: <code>handlers</code> y <code>modular</code>. Las plantillas usan AWS SDK for JavaScript v3 y, opcionalmente, Terraform en <code>__iac__/</code>.</strong>
  <br />
  <em>Encaja bien con Cursor y otros asistentes de código con IA al generar proyectos.</em>
</p>

<p align="center">
  <a href="../README.md">English</a> |
  Español |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
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
  <small><a href="../CHANGELOG.md">CHANGELOG</a>: solo inglés.</small>
</p>

---

## Requisitos

- Node.js **18+** (recomendado 20+)
- npm 9+

<a id="quick-start"></a>

## Inicio rápido

### Tras publicar el paquete

```bash
npx lambda-ya@latest list
npx lambda-ya@latest handlers mi-servicio --yes --no-terraform
npx lambda-ya@latest modular mi-api --yes --terraform --aws-profile=miperfil --aws-account-id=123456789012
```

### Instalación global

```bash
npm i -g lambda-ya
lambda-ya handlers mi-servicio --yes --no-terraform
```

### Desde un clon local de este repositorio

```bash
node bin/lambda-ya.js handlers ./salida/mi-svc --yes --no-terraform
npm link   # luego: lambda-ya ...
```

## Comandos

| Comando | Descripción |
|--------|-------------|
| `lambda-ya help` | Ayuda |
| `lambda-ya list` | Tipos: `handlers`, `modular` |
| `lambda-ya <tipo> <carpeta>` | Crea el scaffold |
| `lambda-ya create <tipo> <carpeta>` | Igual |

Opciones: `--yes`, `--terraform` / `--no-terraform`, `--aws-profile=`, `--aws-account-id=`, `--function-name=`, `--main-handler-file=`, `--main-handler-export=`, `--skip-install`.

## Terraform vs solo zip

- Con **`--terraform`**: se genera `__iac__/` y `__iac__/bin/deploy.sh`. Los comandos Cursor de Terraform/IAM **solo** se copian en este modo.
- Con **`--no-terraform`**: se genera `bin/package-lambda.sh` (build + `lambda.zip`). **No** se añaden comandos Cursor de Terraform.

## Colaboración y publicación

- [CONTRIBUTING.md](../CONTRIBUTING.md) (inglés)
- Publicación: sube versión en `package.json`, actualiza [CHANGELOG.md](../CHANGELOG.md), ejecuta `npm publish`.

## Licencia

ISC — ver [LICENSE.md](../LICENSE.md) y [package.json](../package.json).

## Financiación

Metadatos en `package.json` y [.github/FUNDING.yml](../.github/FUNDING.yml); ajusta enlaces a patrocinadores reales.
