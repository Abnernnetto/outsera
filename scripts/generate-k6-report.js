import { generateReport } from "k6-html-reporter";

generateReport({
  summaryReport: "report-k6/summary.json",
  output: "report-k6/index.html"
});

console.log("Relatório HTML do k6 gerado com sucesso!");
