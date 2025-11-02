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
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run API tests
        run: npm run test:api
      - name: Run E2E OrangeHRM
        run: npm run test:e2e:orange
      - name: Run E2E DemoBlaze
        run: npm run test:e2e:demoblaze
      - name: Generate Allure Report
        run: |
          npm run allure:generate
          npm run allure:open
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
