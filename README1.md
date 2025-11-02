# 🧪 Projeto de Testes Automatizados — API (Swagger PetStore) e Web E2E (OrangeHRM + DemoBlaze)

Este repositório contém **três frentes principais** de automação utilizando **Playwright + TypeScript**, com suporte ao **Cucumber (BDD)** e **Allure Reports** para geração de relatórios interativos.

1. **Testes de API** cobrindo o CRUD da API pública **Swagger PetStore**.  
2. **Testes End-to-End (E2E)** na aplicação **OrangeHRM (login)**.  
3. **Fluxo completo de Checkout E2E** no **site DemoBlaze**, com cenários positivos e negativos.

---

## 📦 Requisitos

- **Node.js** 18+
- **npm** 9+

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

### Configuração do `playwright.config.ts`
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'report', open: 'never' }],
    ['json', { outputFile: 'report/test-results.json' }],
    ['junit', { outputFile: 'report/junit-results.xml' }],
  ],
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  },
});
```

### Estrutura de pastas (API)
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
npx playwright test -c playwright.config.ts
npx playwright test -g "Deve adicionar um pet"
```

### Relatórios
```bash
npx playwright show-report
# HTML: report/index.html
# JSON: report/test-results.json
# JUnit: report/junit-results.xml
```

---

## 🌐 Parte 2 — Testes E2E Web (OrangeHRM + Playwright + Cucumber)

### Site alvo
- **OrangeHRM Demo** — https://opensource-demo.orangehrmlive.com

### Tecnologias
- Playwright (browser automation)
- Cucumber (`@cucumber/cucumber`) para BDD
- TypeScript
- Page Object Model (POM)
- Relatório HTML do Cucumber

### Instalação
```bash
npm i -D @cucumber/cucumber ts-node @types/node
```

### Estrutura de pastas (E2E)
```
tests/
└── e2e/
    ├── orangehrm/
    │   ├── features/
    │   │   └── login.feature
    │   ├── pages/
    │   │   └── login.page.ts
    │   └── steps/
    │       └── login.steps.ts
    └── support/
        ├── hooks.ts
        └── pageFixture.ts
```

### Execução
```bash
# Todos os cenários E2E
npx cucumber-js --config ./cucumber.cjs

# Apenas OrangeHRM
npx cucumber-js --config ./cucumber.cjs tests/e2e/orangehrm/features/login.feature

# Por tag ou nome
npx cucumber-js --config ./cucumber.cjs --name "Login válido"
npx cucumber-js --config ./cucumber.cjs --tags "@smoke"
```

### 📜 Cenários implementados (Login)
```gherkin
Feature: Login no OrangeHRM

  Scenario: Login válido
    Given que estou na página de login
    When insiro credenciais válidas
    Then devo ser redirecionado para o Dashboard

  Scenario: Login com usuário inválido
    Given que estou na página de login
    When insiro usuário inválido
    Then devo ver uma mensagem de erro

  Scenario: Login com senha inválida
    Given que estou na página de login
    When insiro senha inválida
    Then devo ver uma mensagem de erro

 Scenario: Login com credenciais inválidas
    Given que estou na página de login
    When insiro credenciais inválidas
    Then devo ver uma mensagem de erro

 Scenario: Login preenchendo somente usuário
    Given que estou na página de login
    When insiro apenas o usuário e não preencho a senha
    Then devo ver uma mensagem de campo requirido

 Scenario: Login preenchendo somente senha
    Given que estou na página de login
    When insiro apenas a senha e não preencho o usuário
    Then devo ver uma mensagem de campo requirido
```

---

### Relatório
- Gerado em: `reports/cucumber-report.html`

---

## 🧩 Parte 3 — Testes E2E no DemoBlaze (Checkout)

### Site alvo
- **DemoBlaze Store** — https://www.demoblaze.com

### Tecnologias
- Playwright
- Cucumber (BDD)
- Faker.js (massa de teste dinâmica)
- Page Object Model (POM)
- Allure Reports (relatórios interativos)

### Estrutura
```
tests/
└── e2e/
    ├── demoblaze/
    │   ├── data/
    │   │   └── orderData.ts
    │   ├── features/
    │   │   └── checkout.feature
    │   ├── pages/
    │   │   ├── home.page.ts
    │   │   ├── product.page.ts
    │   │   └── cart.page.ts
    │   └── steps/
    │       └── checkout.steps.ts
    └── support/
        ├── hooks.ts
        └── pageFixture.ts
```

---

### 📜 Cenários implementados (Checkout)
```gherkin
Feature: Checkout no Demo Blaze

Scenario: Validação de compra concluída com sucesso
  Given que estou na página Home de produtos do DemoBlaze
  When eu seleciono o produto "Samsung galaxy s6"
  When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
  When eu abro o carrinho para visualizar meus produtos
  When eu inicio a ordem do pedido
  When eu preencho os meus dados pessoais do formulario para realização da compra  
  Then devo ver a mensagem de sucesso "Thank you for your purchase!" com os dados da compra

@negative
Scenario: Validação do campo Name obrigatório no Checkout
  Given que estou na página Home de produtos do DemoBlaze
  When eu seleciono o produto "Samsung galaxy s6"
  When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
  When eu abro o carrinho para visualizar meus produtos
  When eu inicio a ordem do pedido
  When eu tento finalizar a compra deixando o campo Nome vazio
  Then o pedido não deve ser finalizado

@negative
Scenario: Validação do campo Credit card obrigatório no Checkout
  Given que estou na página Home de produtos do DemoBlaze
  When eu seleciono o produto "Samsung galaxy s6"
  When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
  When eu abro o carrinho para visualizar meus produtos
  When eu inicio a ordem do pedido
  When eu tento finalizar a compra deixando o campo Credit Card vazio
  Then o pedido não deve ser finalizado

@negative @bug
Scenario: Validação do campo Year com ano inferior ao atual no Checkout
  Given que estou na página Home de produtos do DemoBlaze
  When eu seleciono o produto "Samsung galaxy s6"
  When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
  When eu abro o carrinho para visualizar meus produtos
  When eu inicio a ordem do pedido
  When eu informo um ano inferior ao atual
  Then o pedido não deve ser finalizado

@negative
Scenario: Validação da remoção do produto no carrinho
  Given que estou na página Home de produtos do DemoBlaze
  When eu seleciono o produto "Samsung galaxy s6"
  When eu adiciono o produto "Samsung galaxy s6" ao carrinho    
  When eu abro o carrinho para visualizar meus produtos
  When removo o produto do carrinho    
  Then o carrinho deve ficar vazio sem nenhum produto
```

---

## ⚙️ Configuração do Allure Report

### 📦 Instalação
```bash
npm install -D allure-commandline allure-cucumberjs allure-playwright
```

### 🧩 Configuração do `cucumber.cjs`
```js
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/e2e/**/steps/**/*.ts',
      'tests/e2e/support/**/*.ts'
    ],
    paths: ['tests/e2e/**/features/**/*.feature'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:allure-results/allure-cucumber.json'
    ],
    publishQuiet: true,
    parallel: 1
  }
};
```

### 🧪 Execução dos testes

```bash
# Todos os testes (API + Web)
npm run test

# Apenas os E2E (Cucumber)
npx cucumber-js --config ./cucumber.cjs

# Apenas DemoBlaze
npx cucumber-js --config ./cucumber.cjs tests/e2e/demoblaze/features/checkout.feature

# Filtrar por tag
npx cucumber-js --config ./cucumber.cjs --tags "@negative"
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

## 📊 Relatórios de execução

### ✅ Cucumber HTML Report
Gerado automaticamente em:
```
reports/cucumber-report.html
```

### ✨ Allure Report
Fornece relatórios ricos, com histórico, screenshots e tempo de execução detalhado.

#### 📦 Geração e visualização
```bash
# Gera os arquivos de relatório
allure generate allure-results --clean

# Abre o relatório interativo no navegador
allure open allure-report
```

#### 📁 Estrutura
```
allure-results/   → resultados brutos
allure-report/    → relatório HTML interativo
```

---

## 📚 Próximos passos

- Adicionar **validações visuais (Visual Regression)** no fluxo do DemoBlaze  
- Integrar **Allure Reports** com **GitHub Actions** para execução contínua  
- Centralizar todos os **bugs conhecidos** no arquivo [`BUGS.md`](BUGS.md)

---

## ✨ Autor

**Abner Nunes Netto**  
📍 QA Engineer — Automação de Testes de API & E2E  
Especialista em **Playwright**, **Cucumber (BDD)** e **Qualidade de Software**
