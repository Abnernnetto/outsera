# 🧪 Projeto de Testes Automatizados — API (Swagger PetStore), Web E2E (OrangeHRM), Web E2E (DemoBlaze) e Performance (K6 + Grafana)

Este repositório contém **quatro frentes de automação**, todas utilizando **Playwright + TypeScript + Cucumber (BDD)**:
1. **Testes de API** — Swagger PetStore.
2. **Testes End-to-End (E2E)** — OrangeHRM (demo).
3. **Testes End-to-End (E2E)** — DemoBlaze (e-commerce, checkout completo).
4. **Testes de Performance** — K6 + Mock API + Grafana/InfluxDB.

---

## 📦 Requisitos

- Node.js 18+ (recomendado >= 22 LTS)
- npm 9+
- Docker (para Grafana e InfluxDB)
- k6 instalado localmente (`brew install k6` no macOS)

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

## 🚀 Parte 4 — Testes de Performance (K6 + Mock API + Grafana/InfluxDB)

### Arquivos importantes
- **Mock API:** `tests/perf/mock-api/server.ts`
- **Script K6:** `tests/perf/k6/load.test.ts`
- **Orquestração:** `scripts/run-perf-ci.sh`
- **Relatórios locais:** `report-k6/k6-report.html` e `report-k6/summary.json`
- **Grafana/InfluxDB:** `docker-compose.yml` + `grafana/provisioning/datasources/datasource.yml`

### Executar teste local (Mock + K6 + Relatório)
```bash
npm run perf:ci
```

### Subir stack Grafana/InfluxDB
```bash
npm run perf:grafana:up
# Grafana: http://localhost:3000 (admin/admin)
# InfluxDB: http://localhost:8086
```

### Enviar métricas para Grafana
```bash
npm run perf:test:influx
```

### Dashboard Grafana
1. Acesse http://localhost:3000
2. Vá em **Dashboards → Import**
3. Use o ID `2587` (*K6 Load Testing Results*)
4. Selecione a data source **InfluxDB-k6**

### Derrubar stack
```bash
npm run perf:grafana:down
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
└── perf/
    ├── k6/
    │   ├── load.test.ts
    │   └── dist/
    │       └── load.test.js
    └── mock-api/
        └── server.ts

report/
reports/
report-k6/
.github/
└── workflows/
    └── ci.yml

grafana/
└── provisioning/
    └── datasources/
        └── datasource.yml

scripts/
└── run-perf-ci.sh

docker-compose.yml
```

---

## 🧾 Scripts Principais (package.json)

```json
{
  "scripts": {
    "test:api": "playwright test tests/api",
    "report:api": "playwright show-report",
    "test:e2e:demoblaze": "cucumber-js --config ./cucumber.cjs tests/e2e/demoblaze/features/**/*.feature",
    "test:e2e:orange": "cucumber-js --config ./cucumber.cjs tests/e2e/orangehrm/features/**/*.feature",
    "test:e2e": "cucumber-js",
    "test:e2e:report": "cucumber-js --format html:reports/cucumber-report.html",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report",
    "perf:build": "esbuild tests/perf/k6/load.test.ts --bundle --platform=browser --format=esm --external:k6 --external:k6/http --outfile=tests/perf/k6/dist/load.test.js",
    "perf:run": "k6 run tests/perf/k6/dist/load.test.js",
    "perf:test": "npm run perf:build && BASE_URL=http://localhost:3333 npm run perf:run",
    "perf:ci": "bash scripts/run-perf-ci.sh",
    "perf:grafana:up": "docker compose up -d",
    "perf:grafana:down": "docker compose down -v",
    "perf:run:influx": "k6 run --out influxdb=http://localhost:8086/k6 tests/perf/k6/dist/load.test.js",
    "perf:test:influx": "npm run perf:build && BASE_URL=http://localhost:3333 npm run perf:run:influx"
  }
}
```

---

## 🧠 Autor
**Abner Nunes Netto** — QA Engineer (API, E2E & Performance Automation)
