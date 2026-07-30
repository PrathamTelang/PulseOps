"use client";

import { motion } from "motion/react";
import { ChartLine } from "./settlement-chart";
import { ChartBar } from "./bar-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ChartConfig } from "@/types";

export function AutoCharts({ charts }: { charts: ChartConfig[] }) {
  if (charts.length === 0) {
    return (
      <Card className="rounded-xl border bg-card shadow-xs">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <svg className="size-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">Upload data to see charts</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {charts.map((chart, i) => (
        <motion.div
          key={`${chart.title}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <Card className="rounded-xl border bg-card shadow-xs">
            <CardHeader className="px-5 pt-5 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">{chart.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{chart.description}</p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {chart.type === "line" ? "Trend" : "Distribution"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-3">
              {chart.type === "line" ? (
                <ChartLine data={chart.data} color={chart.color} />
              ) : (
                <ChartBar data={chart.data} color={chart.color} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
