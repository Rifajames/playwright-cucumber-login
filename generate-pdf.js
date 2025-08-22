const fs = require("fs");
const PDFDocument = require("pdfkit");

function generatePDFReport() {
  const results = JSON.parse(fs.readFileSync("./reports/cucumber_report.json"));
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  doc.pipe(fs.createWriteStream("./reports/TestReport.pdf"));

  // Judul utama
  doc.fontSize(18).fillColor("black").text("Automation Test Report", {
    align: "center"
  });
  doc.moveDown(2);

  results[0].elements.forEach((scenario, i) => {
    // Judul Scenario
    const startX = doc.page.margins.left;
    const maxWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    doc.fontSize(14)
      .fillColor("black")
      .text(`Scenario ${i + 1}: ${scenario.name}`, startX, doc.y, {
        underline: true,
        align: "left",
        width: maxWidth
      });
    doc.moveDown(0.5);

    // Header tabel
    const tableTop = doc.y;
    const rowHeight = 25;
    const colWidths = [280, 100, 100];
    const colX = [startX, startX + 280, startX + 380];

    // Helper: gambar sel dengan border
    function drawCell(text, x, y, width, height, align = "left", color = "black") {
      // Border
      doc.rect(x, y, width, height).stroke();
      // Text
      doc.fillColor(color)
        .fontSize(10)
        .text(text, x + 5, y + 8, {
          width: width - 10,
          align: align
        });
    }

    // Header row
    drawCell("Step", colX[0], tableTop, colWidths[0], rowHeight, "left", "black");
    drawCell("Keyword", colX[1], tableTop, colWidths[1], rowHeight, "center", "black");
    drawCell("Status", colX[2], tableTop, colWidths[2], rowHeight, "center", "black");

    let currentY = tableTop + rowHeight;

    // Isi tabel (steps)
    scenario.steps.forEach(step => {
      const status = step.result.status;
      let color = "orange";
      let statusText = status.toUpperCase();

      if (status === "passed") {
        color = "green";
        statusText = "PASSED";
      } else if (status === "failed") {
        color = "red";
        statusText = "FAILED";
      }

      drawCell(step.name, colX[0], currentY, colWidths[0], rowHeight, "left");
      drawCell(step.keyword.trim(), colX[1], currentY, colWidths[1], rowHeight, "center");
      drawCell(statusText, colX[2], currentY, colWidths[2], rowHeight, "center", color);

      currentY += rowHeight;

      // Kalau tabel melebihi halaman → page baru
      if (currentY > doc.page.height - 100) {
        doc.addPage();
        currentY = doc.y;
      }
    });

    // Garis pemisah antar scenario
    doc.moveTo(startX, currentY + 5)
      .lineTo(doc.page.width - doc.page.margins.right, currentY + 5)
      .strokeColor("gray")
      .stroke();

    doc.moveDown(2);
  });

  doc.end();
}

generatePDFReport();