"use client";

import { motion } from "motion/react";
import { UploadCloud } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onUpload?: () => void;
  onDemo?: () => void;
}

export function EmptyState({ onUpload, onDemo }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="flex size-20 items-center justify-center rounded-3xl bg-muted">
        <UploadCloud className="size-10 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-tight">No data uploaded yet</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Upload an Excel operational report to automatically generate KPIs, charts, and insights.
      </p>

      <div className="mt-8 flex gap-3">
        <Button onClick={onUpload}>Upload Report</Button>
        <Button variant="outline" onClick={onDemo}>Load Demo Data</Button>
      </div>
    </motion.div>
  );
}
