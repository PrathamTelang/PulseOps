"use client";

import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UploadSection() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">
          Upload Reports
        </h1>

        <p className="mt-2 text-zinc-500">
          Upload operational Excel reports to generate dashboards and AI insights.
        </p>
      </div>

      <Card className="mt-8 rounded-3xl border-2 border-dashed border-zinc-300 p-12">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl bg-blue-50 p-5">
            <UploadCloud className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            Drag & Drop Excel Files
          </h2>

          <p className="mt-2 text-center text-zinc-500">
            Supports .xlsx and .xls files
          </p>

          <Button className="mt-8">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
        </div>
      </Card>
    </div>
  );
}