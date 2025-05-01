const { jsPDF } = window.jspdf;

export function generateTemplate4(tableData = []) {
  const startTime = new Date();
  console.log("Start Time:", startTime.toLocaleTimeString());

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [600, 800],
  });

  const primaryColor = [27, 163, 69]; // #1BA345
  const grayColor = [180, 180, 180];
  const lightGray = [240, 240, 240];

  const drawText = (text, x, y, size = 10, options = {}) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", options.bold ? "bold" : "normal");
    doc.setTextColor(...(options.color || [0, 0, 0]));
    doc.text(String(text), x, y);
  };

  const drawLabeledBox = (label, value, x, y, width = 90, height = 35) => {
    doc.setDrawColor(...grayColor);
    doc.rect(x, y - height, width, height);
    drawText(label, x + 5, y - 18, 8);
    drawText(value, x + 5, y - 5, 10, { bold: true });
  };

  const drawHeaderInfo = () => {
    drawText("II-23V951WJ", 30, 770, 12, { bold: true, color: primaryColor });
    drawText("IIJS24415", 300, 770, 10, { color: primaryColor });
    drawText("Feb 17, 2025", 500, 770, 10, { color: primaryColor });

    drawLabeledBox("Quantity", String(tableData.length), 30, 740);
    drawLabeledBox("Gross Wt.", "-", 130, 740);
    drawLabeledBox("Net Wt.", "-", 230, 740);

    drawText("Name: Rahul Mehra (Sheen AI)", 350, 740, 10);
    drawText("Role: Customer", 350, 725, 10);
    drawText("Phone: 9158657458", 350, 710, 10);
  };

  drawHeaderInfo();

  const headers = ["Product No.", "Item", "KT", "Color", "Net Wt"];
  const colWidths = [100, 180, 50, 100, 100];
  const startX = 30;
  let y = 680;
  const rowHeight = 20;

  const drawRow = (row, y, isHeader = false) => {
    let x = startX;
    for (let i = 0; i < row.length; i++) {
      const width = colWidths[i];
      if (isHeader) {
        doc.setFillColor(...lightGray);
        doc.rect(x, y - rowHeight + 5, width, rowHeight, "F");
        drawText(row[i], x + 4, y - 7, 9, { bold: true });
      } else {
        drawText(row[i], x + 4, y - 7, 9);
      }

      doc.setDrawColor(...grayColor);
      doc.rect(x, y - rowHeight + 5, width, rowHeight);
      x += width;
    }
  };

  const drawTableHeader = () => {
    drawRow(headers, y, true);
    y -= rowHeight;
  };

  drawTableHeader();

  for (const row of tableData) {
    if (y < 80) {
      doc.addPage([600, 800], "portrait");
      y = 770;
      drawHeaderInfo();
      y = 680;
      drawTableHeader();
    }

    drawRow(
      [
        row.productNo || "-",
        row.item || "-",
        row.kt || "-",
        row.color || "-",
        row.netWt || "-",
      ],
      y
    );
    y -= rowHeight;
  }

  doc.save("template4.pdf");

  const endTime = new Date();
  console.log("End Time:", endTime.toLocaleTimeString());
  const duration = (endTime - startTime) / 1000;
  console.log(`Total Duration: ${duration.toFixed(2)} s`);
}
