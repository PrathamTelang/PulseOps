"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileSpreadsheet } from "lucide-react";

import { parseExcel, type SheetData } from "@/lib/excel";
import { profileSheets } from "@/lib/data-profiler";

export function FileUpload() {
  const [fileName, setFileName] = useState("");
  const [sheets, setSheets] = useState<SheetData[]>([]);

  // Derived data
  const profiles = profileSheets(sheets);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    setFileName(file.name);

    try {
      const parsedSheets = await parseExcel(file);
      setSheets(parsedSheets);
    } catch (error) {
      console.error("Failed to parse Excel file:", error);
    }
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
      {/* Upload */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-zinc-300 hover:border-blue-400"
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

      {/* Uploaded File */}
      {fileName && (
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="text-green-600" />

            <span className="font-medium">{fileName}</span>
          </div>
        </div>
      )}

      {/* Workbook Summary */}
      {sheets.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-6">
            <p className="text-sm text-zinc-500">
              Total Sheets
            </p>

            <p className="mt-2 text-3xl font-bold">
              {sheets.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-6">
            <p className="text-sm text-zinc-500">
              Total Rows
            </p>

            <p className="mt-2 text-3xl font-bold">
              {sheets.reduce(
                (total, sheet) => total + sheet.rows.length,
                0
              )}
            </p>
          </div>
        </div>
      )}

      {/* Sheets */}
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

                {/* Preview Table */}
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
                        {sheet.rows
                          .slice(0, 5)
                          .map((row, index) => (
                            <tr key={index}>
                              {columns.map((column) => (
                                <td
                                  key={column}
                                  className="border-b px-4 py-3"
                                >
                                  {String(
                                    row[column] ?? "-"
                                  )}
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

      {/* Dataset Summary */}
      {profiles.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Dataset Summary
          </h2>

          {profiles.map((sheet) => (
            <div
              key={sheet.sheetName}
              className="rounded-2xl border border-zinc-200 p-6"
            >
              <h3 className="text-lg font-semibold">
                {sheet.sheetName}
              </h3>

              <div className="mt-2 flex gap-6 text-sm text-zinc-500">
                <span>{sheet.rows} rows</span>
                <span>{sheet.columns} columns</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        Column
                      </th>

                      <th className="px-4 py-3 text-left">
                        Type
                      </th>

                      <th className="px-4 py-3 text-left">
                        Missing
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sheet.profiles.map((column) => (
                      <tr
                        key={column.name}
                        className="border-t"
                      >
                        <td className="px-4 py-3">
                          {column.name}
                        </td>

                        <td className="px-4 py-3 capitalize">
                          {column.type}
                        </td>

                        <td className="px-4 py-3">
                          {column.missing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}