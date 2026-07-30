"use client";

import { useState, useCallback } from "react";
import type { Insight } from "@/types";
import { generateInsights } from "@/lib/insights";

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);

  const refresh = useCallback(() => {
    setInsights(generateInsights());
  }, []);

  return { insights, refresh };
}
