import { type SheetData } from "@/types";
import { profileSheets, type SheetProfile } from "./data-profiler";

let _sheets: SheetData[] = [];
let _fileName = "";
let _listeners: Array<() => void> = [];

export function subscribe(listener: () => void) {
  _listeners.push(listener);
  return () => {
    _listeners = _listeners.filter((l) => l !== listener);
  };
}

function notify() {
  _listeners.forEach((l) => l());
}

export function getSheets(): SheetData[] {
  return _sheets;
}

export function getFileName(): string {
  return _fileName;
}

export function getProfiles(): SheetProfile[] {
  return profileSheets(_sheets);
}

export function hasData(): boolean {
  return _sheets.length > 0 && _sheets.some((s) => s.rows.length > 0);
}

export function totalRows(): number {
  return _sheets.reduce((acc, s) => acc + s.rows.length, 0);
}

export function totalColumns(): number {
  if (_sheets.length === 0) return 0;
  return Math.max(..._sheets.map((s) => (s.rows[0] ? Object.keys(s.rows[0]).length : 0)));
}

export function setData(fileName: string, sheets: SheetData[]) {
  _fileName = fileName;
  _sheets = sheets;
  notify();
}

export function clearData() {
  _fileName = "";
  _sheets = [];
  notify();
}

export function getAllNumericColumns(): { sheetName: string; column: string; values: number[] }[] {
  const result: { sheetName: string; column: string; values: number[] }[] = [];
  for (const sheet of _sheets) {
    const profiles = profileSheets([sheet])[0].profiles;
    for (const p of profiles) {
      if (p.type === "number") {
        const values = sheet.rows
          .map((r) => Number(r[p.name]))
          .filter((v) => !isNaN(v));
        if (values.length > 0) {
          result.push({ sheetName: sheet.sheetName, column: p.name, values });
        }
      }
    }
  }
  return result;
}

export function getAllTextColumns(): { sheetName: string; column: string; values: string[] }[] {
  const result: { sheetName: string; column: string; values: string[] }[] = [];
  for (const sheet of _sheets) {
    const profiles = profileSheets([sheet])[0].profiles;
    for (const p of profiles) {
      if (p.type === "text") {
        const values = sheet.rows
          .map((r) => String(r[p.name] ?? ""))
          .filter((v) => v.length > 0);
        if (values.length > 0) {
          result.push({ sheetName: sheet.sheetName, column: p.name, values });
        }
      }
    }
  }
  return result;
}
