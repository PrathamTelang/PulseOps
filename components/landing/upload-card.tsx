"use client";

import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UploadCard() {
  return (
    <Card className="mx-auto mt-16 max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <FileSpreadsheet className="h-8 w-8 text-blue-600" />
        </div>

        <h2 className="mt-6 text-3xl font-bold">
          Upload your Excel report
        </h2>

        <p className="mt-3 max-w-xl text-zinc-500">
          Drag & drop your operational report or browse your files. PulseOps
          automatically extracts insights, KPIs, and trends in seconds.
        </p>

        <div className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 transition hover:border-blue-400 hover:bg-blue-50/40">
          <Upload className="h-10 w-10 text-zinc-500" />

          <p className="mt-4 font-medium">
            Drag & drop your Excel file
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Supports .xlsx and .xls
          </p>

          <Button className="mt-6">
            Browse Files
          </Button>
        </div>
      </div>
    </Card>
  );
}