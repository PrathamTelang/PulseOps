import { SheetData } from "./excel";

export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "empty";

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  missing: number;
}

export interface SheetProfile {
  sheetName: string;
  rows: number;
  columns: number;
  profiles: ColumnProfile[];
}

export function profileSheets(
  sheets: SheetData[]
): SheetProfile[] {
  return sheets.map((sheet) => {
    const rows = sheet.rows;

    const columnNames =
      rows.length > 0 ? Object.keys(rows[0]) : [];

    const profiles = columnNames.map((column) => {
      const values = rows.map((row) => row[column]);

      const missing = values.filter(
        (value) =>
          value === null ||
          value === undefined ||
          value === ""
      ).length;

      const nonEmpty = values.filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== ""
      );

      let type: ColumnType = "empty";

      if (nonEmpty.length > 0) {
        if (
          nonEmpty.every((value) => typeof value === "number")
        ) {
          type = "number";
        } else if (
          nonEmpty.every((value) => typeof value === "boolean")
        ) {
          type = "boolean";
        } else if (
          nonEmpty.every(
            (value) =>
              value instanceof Date ||
              !isNaN(Date.parse(String(value)))
          )
        ) {
          type = "date";
        } else {
          type = "text";
        }
      }

      return {
        name: column,
        type,
        missing,
      };
    });

    return {
      sheetName: sheet.sheetName,
      rows: rows.length,
      columns: columnNames.length,
      profiles,
    };
  });
}