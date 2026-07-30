"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { KpiCards } from "./kpi-cards";
import { AiInsights } from "./ai-insights";
import { RecentActivity } from "./recent-activity";
import { EmptyState } from "./empty-state";
import { LoadingProcess } from "./loading-process";
import { AutoCharts } from "@/components/charts/auto-charts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartLine } from "@/components/charts/settlement-chart";
import { generateInsights } from "@/lib/insights";
import { generateChartConfigs, getKpiMetrics } from "@/lib/chart-data";
import { hasData, getFileName } from "@/lib/store";
import { generateDemoData } from "@/lib/demo-data";
import { setData } from "@/lib/store";
import { DEMO_KPIS, ACTIVITIES } from "@/lib/constants";
import type { Insight, Activity, ChartConfig } from "@/types";
import { ArrowUpRight } from "@/components/ui/icons";

export function DashboardView() {
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [kpis, setKpis] = useState(DEMO_KPIS);
  const [activities] = useState<Activity[]>(
    ACTIVITIES.map((a, i) => ({ ...a, id: `act-${i}` }))
  );

  const loadDemoData = useCallback(() => {
    setLoading(true);
    const demo = generateDemoData();
    setData("demo-operations-report.xlsx", demo);
    setTimeout(() => {
      setInsights(generateInsights());
      setCharts(generateChartConfigs());
      const metrics = getKpiMetrics();
      if (metrics.length > 0) {
        setKpis(
          metrics.map((m, i) => ({
            ...m,
            icon: DEMO_KPIS[i % DEMO_KPIS.length]?.icon || "Activity",
            color: DEMO_KPIS[i % DEMO_KPIS.length]?.color || "text-blue-600",
            bgColor: DEMO_KPIS[i % DEMO_KPIS.length]?.bgColor || "bg-blue-100",
          }))
        );
      }
      setShowDemo(true);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (hasData() && !showDemo) {
      setInsights(generateInsights());
      setCharts(generateChartConfigs());
      const metrics = getKpiMetrics();
      if (metrics.length > 0) {
        setKpis(
          metrics.map((m, i) => ({
            ...m,
            icon: DEMO_KPIS[i % DEMO_KPIS.length]?.icon || "Activity",
            color: DEMO_KPIS[i % DEMO_KPIS.length]?.color || "text-blue-600",
            bgColor: DEMO_KPIS[i % DEMO_KPIS.length]?.bgColor || "bg-blue-100",
          }))
        );
      }
      setShowDemo(true);
    }
  }, [showDemo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingProcess onComplete={() => {}} />
      </div>
    );
  }

  if (!showDemo) {
    return (
      <div className="px-6 py-8">
        <EmptyState onDemo={loadDemoData} />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-6 py-8 max-md:px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <KpiCards items={kpis} />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card className="rounded-xl border bg-card shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-3">
              <div>
                <CardTitle className="text-sm font-semibold">Settlement Trend</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="size-3" />
                12.4%
              </span>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-2">
              <ChartLine />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <RecentActivity items={activities} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <AutoCharts charts={charts.length > 0 ? charts.slice(0, 2) : []} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <AiInsights insights={insights} />
      </motion.div>
    </div>
  );
}
