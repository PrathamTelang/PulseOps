"use client";

import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Activity } from "@/types";

const dotColors = { green: "bg-green-500", orange: "bg-orange-500", blue: "bg-blue-500" };

export function RecentActivity({ items }: { items: Activity[] }) {
  return (
    <Card className="rounded-xl border bg-card shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between px-5 pt-5 pb-3">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          View all
        </button>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="space-y-1.5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`size-2 shrink-0 rounded-full ${dotColors[item.color]}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-medium text-muted-foreground">{item.status}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
