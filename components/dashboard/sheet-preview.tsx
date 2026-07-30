"use client";

import { motion } from "motion/react";
import { FileSpreadsheet } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import type { SheetData } from "@/types";
import type { SheetProfile } from "@/lib/data-profiler";

export function SheetPreview({ sheets }: { sheets: SheetData[] }) {
  return (
    <>
      {sheets.map((sheet) => {
        const columns = sheet.rows.length > 0 ? Object.keys(sheet.rows[0]) : [];
        return (
          <motion.div
            key={sheet.sheetName}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card"
          >
            <div className="flex items-center justify-between border-b px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="size-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{sheet.sheetName}</span>
                <Badge variant="secondary" className="ml-1">{columns.length} columns</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{sheet.rows.length} rows</span>
            </div>

            {columns.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-5 py-3">
                {columns.map((col) => (
                  <span key={col} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {col}
                  </span>
                ))}
              </div>
            )}

            {sheet.rows.length > 0 && (
              <div className="overflow-x-auto border-t">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {columns.map((col) => (
                        <th key={col} className="px-4 py-2.5 text-xs font-medium text-muted-foreground">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sheet.rows.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                        {columns.map((col) => (
                          <td key={col} className="px-4 py-2.5 text-xs">{String(row[col] ?? "-")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        );
      })}
    </>
  );
}

export function SummaryTable({ profiles }: { profiles: SheetProfile[] }) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b px-5 py-3.5">
        <h3 className="text-sm font-semibold">Dataset Summary</h3>
      </div>
      {profiles.map((sheet) => (
        <div key={sheet.sheetName} className="flex items-center gap-3 border-b px-5 py-2.5 last:border-0">
          <span className="w-32 shrink-0 text-xs font-medium">{sheet.sheetName}</span>
          <span className="text-xs text-muted-foreground">{sheet.rows} rows, {sheet.columns} columns</span>
          <span className="text-xs text-muted-foreground">
            {sheet.profiles.filter((p) => p.missing > 0).length} columns with missing values
          </span>
        </div>
      ))}
    </div>
  );
}
