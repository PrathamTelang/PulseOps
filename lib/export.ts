import { getSheets, getFileName, getProfiles } from "./store";

export function exportAsCSV(): void {
  const sheets = getSheets();
  if (sheets.length === 0) return;

  const allRows: string[] = [];

  for (const sheet of sheets) {
    if (sheet.rows.length === 0) continue;
    const columns = Object.keys(sheet.rows[0]);
    allRows.push(columns.join(","));
    for (const row of sheet.rows) {
      const values = columns.map((col) => {
        const val = row[col];
        if (val === null || val === undefined) return "";
        const str = String(val);
        return str.includes(",") ? `"${str}"` : str;
      });
      allRows.push(values.join(","));
    }
    allRows.push("");
  }

  const blob = new Blob([allRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${getFileName().replace(/\.[^/.]+$/, "")}_export.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsPDF(): void {
  const sheets = getSheets();
  const profiles = getProfiles();
  if (sheets.length === 0) return;

  const fileName = getFileName().replace(/\.[^/.]+$/, "");
  const totalRows = sheets.reduce((acc, s) => acc + s.rows.length, 0);
  const totalCols = profiles.reduce((acc, p) => acc + p.columns, 0);

  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>PulseOps Report - ${fileName}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #18181b; }
        h1 { font-size: 24px; margin-bottom: 4px; }
        h2 { font-size: 18px; margin-top: 32px; margin-bottom: 12px; }
        .meta { color: #71717a; font-size: 14px; margin-bottom: 24px; }
        .summary { display: flex; gap: 24px; margin-bottom: 32px; }
        .stat { background: #f4f4f5; padding: 16px 24px; border-radius: 12px; }
        .stat-label { font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-value { font-size: 28px; font-weight: 700; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e4e4e7; font-size: 13px; }
        th { background: #f4f4f5; font-weight: 600; }
        .sheet-name { font-size: 16px; font-weight: 600; margin-top: 24px; }
      </style>
    </head>
    <body>
      <h1>PulseOps Report</h1>
      <div class="meta">${fileName} &middot; Generated ${new Date().toLocaleDateString()}</div>
      <div class="summary">
        <div class="stat"><div class="stat-label">Total Sheets</div><div class="stat-value">${sheets.length}</div></div>
        <div class="stat"><div class="stat-label">Total Rows</div><div class="stat-value">${totalRows}</div></div>
        <div class="stat"><div class="stat-label">Total Columns</div><div class="stat-value">${totalCols}</div></div>
      </div>
      ${sheets
        .map(
          (sheet) => `
        <h2 class="sheet-name">${sheet.sheetName}</h2>
        <p class="meta">${sheet.rows.length} rows</p>
        ${sheet.rows.length > 0 ? `
        <table>
          <thead><tr>${Object.keys(sheet.rows[0])
            .map((c) => `<th>${c}</th>`)
            .join("")}</tr></thead>
          <tbody>${sheet.rows
            .slice(0, 20)
            .map(
              (row) =>
                `<tr>${Object.values(row)
                  .map((v) => `<td>${v ?? "-"}</td>`)
                  .join("")}</tr>`
            )
            .join("")}</tbody>
        </table>` : ""}
      `
        )
        .join("")}
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}_report.html`;
  a.click();
  URL.revokeObjectURL(url);
}
