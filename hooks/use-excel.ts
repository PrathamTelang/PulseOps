"use client";

import { useState, useCallback } from "react";
import { parseExcel, type SheetData } from "@/lib/excel";
import { setData, getFileName, getSheets } from "@/lib/store";

export function useExcel() {
  const [fileName, setFileName] = useState(getFileName());
  const [sheets, setSheets] = useState<SheetData[]>(getSheets());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const parsed = await parseExcel(file);
      setData(file.name, parsed);
      setFileName(file.name);
      setSheets(parsed);
    } catch (e) {
      setError("Failed to parse file. Please ensure it's a valid .xlsx or .xls file.");
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData("", []);
    setFileName("");
    setSheets([]);
  }, []);

  return { fileName, sheets, loading, error, handleFile, clear };
}
