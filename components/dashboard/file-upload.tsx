"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, CheckCircle2 } from "@/components/ui/icons";
import { useExcel } from "@/hooks/use-excel";
import { profileSheets } from "@/lib/data-profiler";
import { LoadingProcess } from "./loading-process";
import { SheetPreview, SummaryTable } from "./sheet-preview";

export function FileUpload() {
  const { fileName, sheets, loading, error, handleFile, clear } = useExcel();
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setProcessing(true);
    await handleFile(file);
    setProcessing(false);
  }, [handleFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    onDrop,
  });

  const profiles = profileSheets(sheets);
  const totalRows = sheets.reduce((acc, s) => acc + s.rows.length, 0);
  const totalCols = sheets.reduce((acc, s) => acc + (s.rows[0] ? Object.keys(s.rows[0]).length : 0), 0);

  if (processing) {
    return (
      <div className="rounded-2xl border bg-card p-8">
        <LoadingProcess onComplete={() => {}} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          isDragActive
            ? "border-primary bg-primary/5 shadow-xs"
            : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <UploadCloud className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-base font-semibold">Drag & drop your Excel file</p>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse &middot; .xlsx or .xls</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence>
        {fileName && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between rounded-xl border bg-card p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <CheckCircle2 className="size-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{fileName}</p>
                  <p className="text-xs text-muted-foreground">{sheets.length} sheet{sheets.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Remove
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground">Total Sheets</p>
                <p className="mt-1 text-2xl font-bold">{sheets.length}</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground">Total Rows</p>
                <p className="mt-1 text-2xl font-bold">{totalRows.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground">Total Columns</p>
                <p className="mt-1 text-2xl font-bold">{totalCols}</p>
              </div>
            </div>

            <SheetPreview sheets={sheets} />
            <SummaryTable profiles={profiles} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
