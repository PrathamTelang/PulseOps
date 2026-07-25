"use client";

import { FileUpload } from "./file-upload";

export function UploadSection() {
  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">
          Upload Reports
        </h1>

        <p className="mt-2 text-zinc-500">
          Upload operational Excel reports.
        </p>
      </div>

      <div className="mt-8">
        <FileUpload />
      </div>
    </div>
  );
}