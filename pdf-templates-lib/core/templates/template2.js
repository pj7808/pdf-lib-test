export async function generateTemplate2(tableData = []) {
  const { PDFDocument, rgb, StandardFonts } = window.PDFLib;

  const startTime = new Date();
  console.log("Start Time:", startTime.toLocaleTimeString());

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const createPage = () => pdfDoc.addPage([600, 800]);
  let page = createPage();

  const drawText = (text, x, y, size = 10, options = {}) => {
    page.drawText(String(text), {
      x,
      y,
      size,
      font: options.bold ? boldFont : font,
      color: options.color || rgb(0, 0, 0),
    });
  };

  const drawHeaderInfo = () => {
    drawText("II-23V951WJ", 30, 770, 12, { bold: true });
    drawText("IIJS24415", 300, 770, 10);
    drawText("Feb 17, 2025", 500, 770, 10);

    const drawLabeledBox = (label, value, x, y, width = 90, height = 35) => {
      page.drawRectangle({
        x,
        y: y - height,
        width,
        height,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      drawText(label, x + 5, y - 15, 9);
      drawText(value, x + 5, y - 30, 10, { bold: true });
    };

    drawLabeledBox("Quantity", "8", 30, 740);
    drawLabeledBox("Gross Wt.", "64.730 g", 130, 740);
    drawLabeledBox("Net Wt.", "40.246 g", 230, 740);

    drawText("Name: Rahul Mehra (Sheen AI)", 350, 740);
    drawText("Role: Customer", 350, 725);
    drawText("Phone: 9158657458", 350, 710);
  };

  drawHeaderInfo();

  const headers = ["Product No.", "Item", "KT", "Color", "Net Wt"];
  const colWidths = [80, 120, 40, 80, 80];
  const startX = 30;
  let y = 680;
  const rowHeight = 20;

  const drawRow = (row, y, isHeader = false) => {
    let x = startX;
    for (let i = 0; i < row.length; i++) {
      const cellText = String(row[i]);
      const width = colWidths[i];

      if (isHeader) {
        page.drawRectangle({
          x,
          y: y - rowHeight + 5,
          width,
          height: rowHeight,
          color: rgb(0.9, 0.9, 0.9),
        });
      }

      page.drawRectangle({
        x,
        y: y - rowHeight + 5,
        width,
        height: rowHeight,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 0.5,
      });

      drawText(cellText, x + 4, y - 10, 9, { bold: isHeader });
      x += width;
    }
  };

  const drawTableHeader = () => {
    drawRow(headers, y, true);
    y -= rowHeight;
  };

  drawTableHeader();

  for (const row of tableData) {
    if (y < 60) {
      page = createPage();
      y = 770;
      drawHeaderInfo();
      y = 680;
      drawTableHeader();
    }

    drawRow([row.productNo, row.item, row.kt, row.color, row.netWt], y);

    y -= rowHeight;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "template2.pdf";
  link.click();

  const endTime = new Date();
  console.log("End Time:", endTime.toLocaleTimeString());

  const duration = (endTime - startTime) / 1000;
  console.log(`Total Duration: ${duration.toFixed(2)} s`);
}
