const { generateReport } = require("k6-html-reporter");
const path = require("path");
const fs = require("fs");

(async () => {
  const summaryPath = path.resolve("report-k6/summary.json");

  if (!fs.existsSync(summaryPath)) {
    console.error("Summary.json não encontrado em report-k6/");
    process.exit(1);
  }

  console.log("Gerando relatório HTML com k6-html-reporter...");

  await generateReport({
    jsonFile: summaryPath,
    output: "report-k6/index.html",
  });

  console.log("✅ Relatório HTML criado em report-k6/index.html");
})();
