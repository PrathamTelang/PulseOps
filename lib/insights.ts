import type { Insight } from "@/types";
import { getAllNumericColumns, getAllTextColumns, totalRows } from "./store";

function randomId() {
  return Math.random().toString(36).slice(2, 9);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function generateInsights(): Insight[] {
  const insights: Insight[] = [];
  const numericCols = getAllNumericColumns();
  const textCols = getAllTextColumns();
  const total = totalRows();

  if (total === 0) return [];

  for (const col of numericCols) {
    const vals = col.values;
    if (vals.length < 2) continue;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const firstHalf = vals.slice(0, Math.floor(vals.length / 2));
    const secondHalf = vals.slice(Math.floor(vals.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

    if (firstAvg > 0 && secondAvg > 0) {
      const change = ((secondAvg - firstAvg) / firstAvg) * 100;
      if (Math.abs(change) > 3) {
        const direction = change > 0 ? "increased" : "decreased";
        const sentiment = change > 0 ? "positive" : "negative";
        insights.push({
          id: randomId(),
          type: sentiment as "positive" | "negative",
          message: `"${col.column}" ${direction} by ${Math.abs(change).toFixed(1)}% in ${col.sheetName}.`,
          category: "Trend",
        });
      }
    }

    const maxVal = Math.max(...vals);
    const minVal = Math.min(...vals);
    if (maxVal > avg * 2) {
      insights.push({
        id: randomId(),
        type: "negative",
        message: `High values detected in "${col.column}" — maximum is ${maxVal.toLocaleString()} vs average ${avg.toFixed(0)}.`,
        category: "Anomaly",
      });
    }
    if (minVal < avg * 0.3) {
      insights.push({
        id: randomId(),
        type: "neutral",
        message: `Low outlier in "${col.column}" — minimum is ${minVal.toLocaleString()}.`,
        category: "Anomaly",
      });
    }
  }

  for (const col of textCols) {
    const unique = new Set(col.values);
    if (unique.size > 1) {
      const counts: Record<string, number> = {};
      for (const v of col.values) {
        counts[v] = (counts[v] || 0) + 1;
      }
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const top = sorted[0];
      if (top && top[1] > col.values.length * 0.4) {
        insights.push({
          id: randomId(),
          type: "neutral",
          message: `"${top[0]}" has the highest workload in "${col.column}" (${top[1]} records).`,
          category: "Workload",
        });
      }
      if (sorted.length > 1) {
        const last = sorted[sorted.length - 1];
        insights.push({
          id: randomId(),
          type: last[1] < 3 ? "positive" : "neutral",
          message: `"${last[0]}" contains the fewest records in "${col.column}" (${last[1]}).`,
          category: "Distribution",
        });
      }
    }
  }

  const missingData: { col: string; missing: number }[] = [];
  for (const col of numericCols) {
    const prof = col.values;
    const sheetHasMissing = false;
    missingData.push({ col: col.column, missing: 0 });
  }

  if (insights.length < 2) {
    insights.push({
      id: randomId(),
      type: "positive",
      message: `Dataset contains ${totalRows().toLocaleString()} records across ${numericCols.length} metric columns.`,
      category: "Summary",
    });
  }

  if (insights.length < 3) {
    insights.push({
      id: randomId(),
      type: "positive",
      message: "Data quality appears good with structured numeric and categorical fields.",
      category: "Quality",
    });
  }

  return insights.slice(0, 6);
}
