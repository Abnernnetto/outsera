
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

echo "🏋️‍♂️ Rodando k6..."
npm run perf:build

BASE_URL=http://localhost:3333 \
k6 run tests/perf/k6/dist/load.test.js \
  --out html=report-k6/index.html \
  --summary-export=report-k6/summary.json

echo "📄 Arquivos gerados:"
ls -la report-k6 || true

echo "🧹 Encerrando mock (PID=$MOCK_PID)..."
kill $MOCK_PID 2>/dev/null || true

echo "✅ Teste de performance concluído!"
