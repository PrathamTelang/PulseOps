"use client";

import { motion } from "motion/react";
import { Sparkles, CheckCircle2, XCircle, Info } from "@/components/ui/icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Insight } from "@/types";

const icons = { positive: CheckCircle2, negative: XCircle, neutral: Info };
const colors = {
  positive: "text-green-600 bg-green-50 border-green-200",
  negative: "text-red-600 bg-red-50 border-red-200",
  neutral: "text-blue-600 bg-blue-50 border-blue-200",
};

export function AiInsights({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;

  return (
    <Card className="rounded-xl border bg-card shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100">
            <Sparkles className="size-3.5 text-blue-600" />
          </div>
          <CardTitle className="text-sm font-semibold">AI Insights</CardTitle>
        </div>
        <span className="text-[11px] text-muted-foreground">Auto-generated</span>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="space-y-2">
          {insights.map((insight, i) => {
            const Icon = icons[insight.type];
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`flex items-start gap-3 rounded-lg border p-3 ${colors[insight.type]}`}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{insight.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{insight.category}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
