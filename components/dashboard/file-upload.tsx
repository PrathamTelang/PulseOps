"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

type SheetData = {
  sheetName: string;
  rows: Record<string, unknown>[];
};

export function FileUpload() {
  const [fileName, setFileName] = useState("");
  const [sheets, setSheets] = useState<SheetData[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setFileName(file.name);

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: "array",
    });

    const parsedSheets = workbook.SheetNames.map((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

      return {
        sheetName,
        rows,
      };
    });

    setSheets(parsedSheets);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-zinc-300"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <UploadCloud className="h-10 w-10 text-blue-600" />

          <h2 className="mt-6 text-xl font-semibold">
            Drag & Drop Excel File
          </h2>

          <p className="mt-2 text-zinc-500">
            or click to browse
          </p>
        </div>
      </div>

      {fileName && (
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="text-green-600" />

            <span className="font-medium">
              {fileName}
            </span>
          </div>
        </div>
      )}

      {sheets.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Sheets
          </h3>

          {sheets.map((sheet) => {
  const columns =
    sheet.rows.length > 0
      ? Object.keys(sheet.rows[0])
      : [];

  return (
    <div
      key={sheet.sheetName}
      className="rounded-xl border border-zinc-200 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">
            {sheet.sheetName}
          </h4>

          <p className="text-sm text-zinc-500">
            {sheet.rows.length} rows
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
          {columns.length} columns
        </span>
      </div>

      {/* Column Badges */}
      {columns.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {columns.map((column) => (
            <span
              key={column}
              className="rounded-lg bg-zinc-100 px-3 py-1 text-xs"
            >
              {column}
            </span>
          ))}
        </div>
      )}

      {/* 👇 ADD THE TABLE HERE */}
      {sheet.rows.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border-b px-4 py-3 font-medium"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sheet.rows.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="border-b px-4 py-3"
                    >
                      {String(row[column] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
})}
        </div>
      )}
    </div>
  );
}