import * as XLSX from "xlsx";

export type SheetData = {
  sheetName: string;
  rows: Record<string, unknown>[];
};

export function parseExcel(file: File): Promise<SheetData[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: "array",
      });

      const sheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];

        const rows =
          XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

        return {
          sheetName,
          rows,
        };
      });

      resolve(sheets);
    } catch (error) {
      reject(error);
    }
  });
}