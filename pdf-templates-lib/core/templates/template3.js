export function generateTemplate3(tableData = []) {
  const startTime = new Date();
  console.log("Start Time:", startTime.toLocaleTimeString());

  const tableBody = [];

  // Check if tableData is not empty
  if (tableData.length > 0) {
    // Dynamically generate the header based on the first item in tableData
    const columns = Object.keys(tableData[0]);

    // Add table header
    const headerRow = columns.map((col) => ({
      text: col.charAt(0).toUpperCase() + col.slice(1), // Capitalize the first letter for display
      bold: true,
    }));
    tableBody.push(headerRow);

    // Add rows dynamically based on 'tableData'
    tableData.forEach((row) => {
      const tableRow = columns.map((col) => row[col] || "—"); // Handle missing values
      tableBody.push(tableRow);
    });

    // Add footer row (adjusting for the number of columns)
    const footerRow = [
      {
        text: "Total",
        colSpan: headerRow.length - 1,
        bold: true,
        alignment: "right",
      },
    ];
    footerRow.push(...Array(headerRow.length - 2).fill({}));
    footerRow.push({ text: "—", bold: true });
    tableBody.push(footerRow);
  } else {
    console.log("No data provided for table.");
  }

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [30, 60, 30, 60], // [left, top, right, bottom]
    header: {
      text: "Invoice Header - Company Logo or Title",
      alignment: "center",
      margin: [0, 20, 0, 10],
      fontSize: 12,
      bold: true,
    },
    footer: function (currentPage, pageCount) {
      return {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: "center",
        margin: [0, 10, 0, 0],
        fontSize: 10,
      };
    },
    content: [
      {
        columns: [
          {
            width: "60%",
            layout: "noBorders",
            table: {
              body: [
                ["Quantity", "8"],
                ["Gross WT.", "64.730 g"],
                ["Net WT.", "40.246 g"],
              ],
            },
            margin: [0, 0, 10, 20],
          },
          {
            width: "40%",
            layout: "noBorders",
            table: {
              body: [
                ["Name:", "Rahul Mehra (Sheen AI)"],
                ["Role:", "Customer"],
                ["Phone:", "9158657458"],
              ],
            },
            margin: [10, 0, 0, 20],
          },
        ],
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: new Array(tableBody[0]?.length).fill("*"), // Dynamically set column widths based on table headers
          body: tableBody,
        },
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function () {
            return 0;
          },
          hLineColor: function (i) {
            return i === 0 ? "#000" : "#ccc";
          },
          paddingTop: function () {
            return 4;
          },
          paddingBottom: function () {
            return 4;
          },
        },
        dontBreakRows: true,
      },
    ],
    styles: {
      tableExample: {
        margin: [0, 10, 0, 10],
        fontSize: 10,
      },
    },
  };

  // Create and download the PDF
  pdfMake.createPdf(docDefinition).download("template3.pdf");

  const endTime = new Date();
  console.log("End Time:", endTime.toLocaleTimeString());
  console.log("Time Taken:", (endTime - startTime) / 1000, "s");
}
