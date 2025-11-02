# 🧪 Projeto de Testes Automatizados — API (Swagger PetStore), Web E2E (OrangeHRM) e Web E2E (DemoBlaze)

Este repositório contém **três frentes de automação**, todas utilizando **Playwright + TypeScript + Cucumber (BDD)**:
1. **Testes de API** — Swagger PetStore.
2. **Testes End-to-End (E2E)** — OrangeHRM (demo).
3. **Testes End-to-End (E2E)** — DemoBlaze (e-commerce, checkout completo).

---

## 📦 Requisitos

- Node.js 18+ (recomendado >= 22 LTS)
- npm 9+

```bash
npm ci || npm install
npx playwright install
```

---

## 🧪 Parte 1 — Testes de API (Swagger PetStore)

### Tecnologias
- Playwright (API Testing)
- TypeScript
- Faker.js (geração de massa)
- Relatórios: HTML, JSON e JUnit (nativos do Playwright)

### Estrutura de pastas
```
tests/
└── api/
    ├── data/
    │   └── testData.ts
    └── pets/
        ├── pet.create.spec.ts
        ├── pet.findByStatus.spec.ts
        ├── pet.update.spec.ts
        └── pet.delete.spec.ts
```

### Execução
```bash
npm run test:api
```

### Relatórios
- HTML: `npx playwright show-report`
- JSON e JUnit também disponíveis em `/report`.

---

## 🌐 Parte 2 — Testes E2E Web (OrangeHRM + Cucumber)

### Site alvo
- [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)

### Tecnologias
- Playwright + Cucumber (BDD)
- TypeScript + Page Object Model (POM)
- Relatório HTML e Allure

### Estrutura de pastas
```
tests/
└── e2e/
    ├── orangehrm/
    │   ├── features/
    │   ├── pages/
    │   └── steps/
    └── support/
        ├── hooks.ts
        └── pageFixture.ts
```

### Execução
```bash
npm run test:e2e:orange
```

### Relatório Cucumber
Gerado automaticamente em:
```
reports/cucumber-report.html
```

### Relatório Allure
```bash
npm run allure:generate
npm run allure:open
```
> O relatório será aberto em `http://localhost:5252`

---

## 🛒 Parte 3 — Testes E2E Web (DemoBlaze Checkout)

### Site alvo
- [DemoBlaze](https://www.demoblaze.com)

### Estrutura de pastas
```
tests/
└── e2e/
    ├── demoblaze/
    │   ├── data/
    │   ├── features/
    │   ├── pages/
    │   └── steps/
    └── support/
```

### Cenários Implementados

#### ✅ Validação de compra concluída com sucesso
#### ❌ Campo Name obrigatório
#### ❌ Campo Credit Card obrigatório
#### ⚠️ Campo Year inferior ao atual (bug conhecido)
#### 🔄 Remoção do produto do carrinho

### Execução
```bash
npm run test:e2e:demoblaze
```

---

## ⚙️ CI/CD — GitHub Actions

Pipeline configurado para:
- Instalar dependências
- Executar testes de API e E2E (OrangeHRM + DemoBlaze)
- Gerar relatórios (HTML e Allure)

Arquivo `.github/workflows/ci.yml`:
```yaml
name: CI - API, E2E (Web) with Reports

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  api-tests:
    name: API Tests (Playwright)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run API tests
        run: |
          npx playwright test tests/api --reporter=list,html
        env:
          NODE_ENV: test

      # (Opcional) Gera Allure se houver resultados
      - name: Generate Allure report (if configured)
        if: always() && hashFiles('allure-results/**') != ''
        run: npx allure generate allure-results --clean -o allure-report

      - name: Upload Playwright HTML report
        if: always() && hashFiles('report/**') != ''
        uses: actions/upload-artifact@v4
        with:
          name: api-playwright-report
          path: report/

      - name: Upload Allure report
        if: always() && hashFiles('allure-report/**') != ''
        uses: actions/upload-artifact@v4
        with:
          name: api-allure-report
          path: allure-report/

  e2e-orangehrm:
    name: E2E OrangeHRM (Cucumber + Playwright)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run OrangeHRM feature(s)
        run: |
          npx cucumber-js --config ./cucumber.cjs tests/e2e/orangehrm/features/login.feature

      - name: Upload Cucumber HTML report
        if: always() && hashFiles('reports/cucumber-report.html') != ''
        uses: actions/upload-artifact@v4
        with:
          name: e2e-orangehrm-cucumber-report
          path: reports/cucumber-report.html

  e2e-demoblaze:
    name: E2E DemoBlaze (Cucumber + Playwright)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run DemoBlaze feature(s)
        run: |
          npx cucumber-js --config ./cucumber.cjs tests/e2e/demoblaze/features/checkout.feature

      - name: Upload Cucumber HTML report
        if: always() && hashFiles('reports/cucumber-report.html') != ''
        uses: actions/upload-artifact@v4
        with:
          name: e2e-demoblaze-cucumber-report
          path: reports/cucumber-report.html

  publish-pages:
    name: Publish Reports to GitHub Pages
    runs-on: ubuntu-latest
    needs: [api-tests, e2e-orangehrm, e2e-demoblaze]
    if: always()
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: ./_artifacts

      - name: Prepare Pages content
        run: |
          mkdir -p ./_site
          # Playwright HTML
          if [ -d "./_artifacts/api-playwright-report" ]; then mkdir -p ./_site/api-playwright && cp -r ./_artifacts/api-playwright-report/* ./_site/api-playwright/; fi
          # Allure (se houver)
          if [ -d "./_artifacts/api-allure-report" ]; then mkdir -p ./_site/api-allure && cp -r ./_artifacts/api-allure-report/* ./_site/api-allure/; fi
          # Cucumber reports
          if [ -d "./_artifacts/e2e-orangehrm-cucumber-report" ]; then mkdir -p ./_site/e2e-orangehrm && cp -r ./_artifacts/e2e-orangehrm-cucumber-report/* ./_site/e2e-orangehrm/; fi
          if [ -d "./_artifacts/e2e-demoblaze-cucumber-report" ]; then mkdir -p ./_site/e2e-demoblaze && cp -r ./_artifacts/e2e-demoblaze-cucumber-report/* ./_site/e2e-demoblaze/; fi

      - name: Setup Pages
        uses: actions/configure-pages@v5
      
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./_site

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

---

## 📂 Estrutura Final do Projeto

```
tests/
├── api/
├── e2e/
│   ├── orangehrm/
│   ├── demoblaze/
│   └── support/
├── reports/
│   ├── allure-results/
│   └── cucumber-report.html
.github/
└── workflows/
    └── ci.yml
```

---

## 🧾 Scripts Principais (package.json)
```json
{
  "scripts": {
    "test:api": "playwright test tests/api",
    "test:e2e:orange": "cucumber-js --config ./cucumber.cjs tests/e2e/orangehrm/features/**/*.feature",
    "test:e2e:demoblaze": "cucumber-js --config ./cucumber.cjs tests/e2e/demoblaze/features/**/*.feature",
    "allure:generate": "allure generate --clean allure-results",
    "allure:open": "allure open allure-report"
  }
}
```

---

## 🧠 Autor
**Abner Nunes Netto** — QA Engineer (API & E2E Automation)
