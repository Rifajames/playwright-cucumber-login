const fs = require("fs");
const PDFDocument = require("pdfkit");

function generatePDFReport() {
  const results = JSON.parse(fs.readFileSync("./reports/cucumber_report.json"));
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("./reports/TestReport.pdf"));

  doc.fontSize(16).text("Automation Test Report", { align: "center" });
  doc.moveDown();

  results[0].elements.forEach((scenario, i) => {
    doc.fontSize(14).text(`Scenario ${i + 1}: ${scenario.name}`);
    scenario.steps.forEach(step => {
      const status = step.result.status === "passed" ? "✅ Passed" : "❌ Failed";
      doc.fontSize(12).text(`- ${step.keyword} ${step.name}: ${status}`);
    });
    doc.moveDown();
  });

  doc.end();
}

generatePDFReport();