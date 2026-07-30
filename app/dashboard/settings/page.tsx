"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Info, RefreshCw } from "@/components/ui/icons";
import { clearData } from "@/lib/store";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage preferences">
      <div className="space-y-6 px-6 py-8 max-w-2xl max-md:px-4">
        <Card className="rounded-xl border bg-card shadow-xs">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Theme</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Toggle between light and dark mode</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Button variant="outline" onClick={toggleTheme} className="w-full">
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              Switch to {theme === "light" ? "dark" : "light"} mode
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card shadow-xs">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <RefreshCw className="size-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Data</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Clear all uploaded data</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Button
              variant="outline"
              onClick={() => { clearData(); window.location.reload(); }}
              className="w-full text-destructive hover:text-destructive"
            >
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border bg-card shadow-xs">
          <CardHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Info className="size-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">About</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">PulseOps prototype information</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Version:</strong> 0.1.0</p>
            <p><strong className="text-foreground">Tech:</strong> Next.js, TypeScript, Tailwind CSS, shadcn/ui</p>
            <p><strong className="text-foreground">Data:</strong> 100% in-browser. No data is uploaded to any server.</p>
            <p className="pt-2 text-xs">Built as a prototype demonstration. Not for production use.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
