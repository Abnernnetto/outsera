
set -euo pipefail

echo "🚀 Subindo mock API (server.ts via ts-node)..."
npx ts-node tests/perf/mock-api/server.ts &
MOCK_PID=$!

# Espera subir /health
echo "⏳ Aguardando mock subir..."
sleep 3
for i in {1..15}; do
  if curl -s http://localhost:3333/health | grep -q "ok"; then
    echo "✅ Mock pronto!"
    break
  fi
  sleep 2
done

mkdir -p report-k6

echo "Executando teste de carga (build + k6)..."
npm run perf:build
BASE_URL=http://localhost:3333 npm run perf:run

echo "Gerando relatório HTML bonito (k6-reporter)..."
k6-html-reporter --summary-report report-k6/summary.json --output report-k6/index.html

echo "📄 Conteúdo gerado em report-k6:"
ls -la report-k6 || true

echo "🧹 Encerrando mock (PID=$MOCK_PID)..."
kill $MOCK_PID 2>/dev/null || true
echo "✅ Teste de performance concluído!"
