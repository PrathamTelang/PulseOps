"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { EmptyState } from "@/components/dashboard/empty-state";
import { AutoCharts } from "@/components/charts/auto-charts";
import { generateChartConfigs } from "@/lib/chart-data";
import { hasData } from "@/lib/store";
import { generateDemoData } from "@/lib/demo-data";
import { setData } from "@/lib/store";
import { LoadingProcess } from "@/components/dashboard/loading-process";
import type { ChartConfig } from "@/types";

export default function AnalyticsPage() {
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [hasDataState, setHasDataState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHasDataState(hasData());
    if (hasData()) {
      setCharts(generateChartConfigs());
    }
  }, []);

  const handleDemo = () => {
    setLoading(true);
    const demo = generateDemoData();
    setData("demo-analytics.xlsx", demo);
    setTimeout(() => {
      setCharts(generateChartConfigs());
      setHasDataState(true);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <DashboardLayout title="Analytics" subtitle="Auto-generated charts">
        <div className="flex items-center justify-center py-20">
          <LoadingProcess onComplete={() => {}} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Analytics" subtitle="Auto-generated charts">
      <div className="space-y-6 px-6 py-8 max-md:px-4">
        {!hasDataState ? (
          <EmptyState onDemo={handleDemo} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {charts.length} chart{charts.length !== 1 ? "s" : ""} generated from your data
              </p>
            </div>
            <AutoCharts charts={charts} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
