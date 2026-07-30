"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Download, FileText, FileSpreadsheet } from "@/components/ui/icons";
import { hasData, getFileName } from "@/lib/store";
import { exportAsCSV, exportAsPDF } from "@/lib/export";
import { generateDemoData } from "@/lib/demo-data";
import { setData } from "@/lib/store";
import { useState } from "react";

export default function ReportsPage() {
  const [hasDataState, setHasDataState] = useState(hasData());

  const handleDemo = () => {
    const demo = generateDemoData();
    setData("demo-operations-report.xlsx", demo);
    setHasDataState(true);
  };

  return (
    <DashboardLayout title="Reports" subtitle="Export dashboards and data">
      <div className="space-y-6 px-6 py-8 max-md:px-4">
        {!hasDataState ? (
          <EmptyState onDemo={handleDemo} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Export from: <span className="font-medium text-foreground">{getFileName()}</span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="rounded-xl border bg-card shadow-xs">
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100">
                      <FileText className="size-4 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">Export as PDF</CardTitle>
                      <CardDescription className="text-xs">Download a formatted report</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <Button onClick={exportAsPDF} className="w-full" variant="outline">
                    <Download className="size-4" />
                    Export PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-xl border bg-card shadow-xs">
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-green-100">
                      <FileSpreadsheet className="size-4 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">Export as CSV</CardTitle>
                      <CardDescription className="text-xs">Download raw data as CSV</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <Button onClick={exportAsCSV} className="w-full" variant="outline">
                    <Download className="size-4" />
                    Export CSV
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
