import type { ChartConfig } from "@/types";
import { getAllNumericColumns, getAllTextColumns } from "./store";

const CHART_COLORS = ["#18181b", "#3b82f6", "#16a34a", "#f59e0b", "#dc2626", "#8b5cf6", "#06b6d4", "#ec4899"];

function sampleValues(values: number[], max: number): number[] {
  if (values.length <= max) return values;
  const step = Math.floor(values.length / max);
  return values.filter((_, i) => i % step === 0).slice(0, max);
}

export function generateChartConfigs(): ChartConfig[] {
  const charts: ChartConfig[] = [];
  const numericCols = getAllNumericColumns();
  const textCols = getAllTextColumns();

  for (const col of numericCols.slice(0, 3)) {
    const sampled = sampleValues(col.values, 12);
    const data = sampled.map((v, i) => ({
      label: `#${i + 1}`,
      value: Math.round(v * 100) / 100,
    }));
    charts.push({
      type: "line",
      title: col.column,
      description: `${col.sheetName}`,
      data,
      color: CHART_COLORS[numericCols.indexOf(col) % CHART_COLORS.length],
    });
  }

  for (const col of textCols.slice(0, 2)) {
    const counts: Record<string, number> = {};
    for (const v of col.values) {
      counts[v] = (counts[v] || 0) + 1;
    }
    const entries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    if (entries.length > 1) {
      const data = entries.map(([label, value]) => ({ label, value }));
      charts.push({
        type: "bar",
        title: `By ${col.column}`,
        description: col.sheetName,
        data,
        color: CHART_COLORS[(numericCols.length + textCols.indexOf(col)) % CHART_COLORS.length],
      });
    }
  }

  return charts;
}

export function getKpiMetrics(): { label: string; value: string; change: number; icon: string }[] {
  const numericCols = getAllNumericColumns();
  if (numericCols.length === 0) return [];

  const metrics: { label: string; value: string; change: number; icon: string }[] = [];

  for (const col of numericCols.slice(0, 4)) {
    const vals = col.values;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const firstHalf = vals.slice(0, Math.floor(vals.length / 2));
    const secondHalf = vals.slice(Math.floor(vals.length / 2));
    const fAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length || 1;
    const sAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length || 0;
    const change = ((sAvg - fAvg) / fAvg) * 100;

    metrics.push({
      label: col.column,
      value: avg >= 1000 ? `${(avg / 1000).toFixed(1)}k` : avg.toFixed(1),
      change: Math.round(change * 10) / 10,
      icon: "trending-up",
    });
  }

  return metrics;
}
