import http from 'k6/http';
import { sleep, check } from 'k6';
import type { Options } from 'k6/options';

export const options: Options = {
  vus: 500,              // 500 usuários virtuais
  duration: '5m',        // por 5 minutos
  thresholds: {
    http_req_failed: ['rate<0.01'],     // < 1% falhas
    http_req_duration: ['p(95)<300'],   // 95% < 300ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3333';

type OrderResponse = { id: string | number };

export default function () {
  // 1) Health check
  let res = http.get(`${BASE_URL}/health`);
  check(res, { 'GET /health - 200': (r) => r.status === 200 });

  // 2) Criar um pedido
  const orderPayload = JSON.stringify({ item: 'notebook', qty: 1 });
  res = http.post(`${BASE_URL}/orders`, orderPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res, { 'POST /orders - 201': (r) => r.status === 201 });

  const order = res.json() as OrderResponse;
  const id = order.id;

  // 3) Buscar pedido criado
  res = http.get(`${BASE_URL}/orders/${id}`, { tags: { name: 'GET /orders/:id' } });
  check(res, { 'GET /orders/:id - 200': (r) => r.status === 200 });

  // Pausa humana
  sleep(Math.random() * 2 + 0.5);
}

  function htmlReport(data: any) {
    return `
      <div>
        <h1>Load Test Report</h1>
        <p>Number of virtual users: ${data.vus}</p>
        <p>Number of iterations: ${data.iterations}</p>
        <p>Duration: ${data.duration}</p>
      </div>
    `;
  }

  export function handleSummary(data: any) {
    const iterations = data?.metrics?.iterations?.count ?? 0;
    const vusMax = data?.metrics?.vus_max?.max ?? data?.metrics?.vus?.max ?? 0;
    const durationMs = data?.state?.testRunDurationMs ?? 0;
  
    const http = data?.metrics?.http_req_duration ?? {};
    const p95 = http['p(95)'] ?? null;
    const httpFailedRate = data?.metrics?.http_req_failed?.rate ?? 0;
  
    const fmt = (ms: number) => {
      const s = Math.round(ms / 1000);
      const mm = Math.floor(s / 60).toString().padStart(2, '0');
      const ss = (s % 60).toString().padStart(2, '0');
      return `${mm}:${ss}`;
    };
  
    const html = `
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Load Test Report</title>
          <style>
            body { font-family: system-ui, Arial, sans-serif; padding: 24px; }
            h1 { margin-top: 0; }
            .kpi { font-size: 18px; line-height: 1.7; }
            code { background:#f4f4f4; padding:2px 6px; border-radius:4px; }
          </style>
        </head>
        <body>
          <h1>Load Test Report</h1>
          <div class="kpi">
            <div><strong>Max VUs:</strong> ${vusMax}</div>
            <div><strong>Iterations:</strong> ${iterations}</div>
            <div><strong>Duration:</strong> ${fmt(durationMs)} (${durationMs} ms)</div>
            <div><strong>http_req_duration p(95):</strong> ${p95 ?? 'n/a'} ms</div>
            <div><strong>http_req_failed rate:</strong> ${httpFailedRate}</div>
          </div>
          <p>Veja o JSON completo em <code>report-k6/summary.json</code>.</p>
        </body>
      </html>
    `;
  
    return {
      'report-k6/k6-report.html': html,
      'report-k6/summary.json': JSON.stringify(data, null, 2),
    };
  }
  
  (globalThis as any).handleSummary = handleSummary;
  