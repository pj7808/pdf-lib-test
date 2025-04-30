export function generateTemplate1(tableData = []) {
  const startTime = new Date();
  console.log("Start Time:", startTime.toLocaleTimeString());

  // Generate table rows from passed data
  let tableRows = "";
  for (let i = 0; i < tableData.length; i++) {
    const row = tableData[i];
    tableRows += `
      <tr>
        <td>${row.productNo}</td>
        <td>${row.item}</td>
        <td>${row.color}</td>
        <td>${row.netWt}</td>
        <td>${row.kt}</td>
      </tr>
    `;
  }

  const invoiceHTML = `
    <div id="invoice" class="invoice-container">
      <!-- Simulated page header -->
      <div class="pdf-header">Invoice Header (Company Info or Logo)</div>

      <div class="header">
        <div class="left">
          <div><p>Quantity</p><b>8</b></div>
          <div><p>Gross Wt</p><b>64.730 g</b></div>
          <div><p>Net Wt</p><b>40.246 g</b></div>
        </div>
        <div class="right">
          <p><span>Name:</span> TESTING WILL ADD LATER</p>
          <p><span>Role:</span> Customer</p>
          <p><span>Phone:</span> 915865--0--8</p>
        </div>
      </div>

      <div class="table">
        <table>
          <thead>
            <tr>
              <td>Product No.</td>
              <td>Item</td>
              <td>Color</td>
              <td>Net WT.</td>
              <td>KT</td>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Simulated page footer -->
      <div class="pdf-footer">Invoice Footer — Page info, Signature, etc.</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = invoiceHTML;
  document.body.appendChild(container);

  const style = document.createElement("style");
  style.innerHTML = `
    .invoice-container {
      width: 718px;
      margin: 0 auto;
      font-family: sans-serif;
      font-size: 12px;
      padding: 10px 0;
    }

    .pdf-header, .pdf-footer {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      padding: 8px;
      border-bottom: 1px solid #ccc;
      position: running(header-footer);
    }

    .pdf-footer {
      border-top: 1px solid #ccc;
      margin-top: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin: 12px 0;
    }

    .left {
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      border: 1px solid rgb(68, 255, 47);
      border-radius: 16px;
      padding: 8px;
    }

    .left div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .right {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: space-between;
      border: 1px solid rgb(68, 255, 47);
      border-radius: 16px;
      padding: 8px;
    }

    .right span {
      font-weight: bold;
    }

    .table {
      border: 1px solid rgb(68, 255, 47);
      border-radius: 16px;
      padding: 8px;
      margin-top: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 4px;
      text-align: left;
      font-size: 12px;
    }

    thead td {
      font-weight: bold;
      border-bottom: 2px solid #444;
    }

    tbody tr {
      page-break-inside: avoid;
    }

    tbody tr:not(:last-child) td {
      border-bottom: 1px solid #ccc;
    }

    tfoot td {
      font-weight: bold;
      border-top: 2px solid #444;
      padding-top: 8px;
    }
  `;
  document.head.appendChild(style);

  html2pdf()
    .from(container)
    .set({
      margin: 0,
      filename: "template1.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    })
    .save()
    .then(() => {
      document.body.removeChild(container);
      const endTime = new Date();
      console.log("End Time:", endTime.toLocaleTimeString());

      const duration = (endTime - startTime) / 1000;
      console.log(`Total Duration: ${duration.toFixed(2)} s`);
    });
}
