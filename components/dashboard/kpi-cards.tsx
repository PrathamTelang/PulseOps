"use client";

import { motion } from "motion/react";
import { Activity, Clock3, ShieldCheck, AlertTriangle, TrendingUp } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";

const ICONS = { Activity, Clock3, ShieldCheck, AlertTriangle, TrendingUp } as const;

interface KpiCardData {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
  bgColor: string;
}

export function KpiCards({ items }: { items: KpiCardData[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon as keyof typeof ICONS] || TrendingUp;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            <Card className="rounded-xl border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div className={`flex size-10 items-center justify-center rounded-xl ${item.bgColor}`}>
                  <Icon className={`size-4 ${item.color}`} />
                </div>
                <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.change >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  {item.change >= 0 ? <TrendingUp className="size-3" /> : null}
                  {item.change >= 0 ? "+" : ""}{item.change}%
                </span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{item.label}</p>
              <p className={`mt-1 text-2xl font-bold tracking-tight ${item.color}`}>{item.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">vs previous period</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
