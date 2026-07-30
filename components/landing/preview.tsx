import { Card } from "@/components/ui/card";
import { ChartLine } from "@/components/charts/settlement-chart";
import { Activity, Clock3, ShieldCheck, AlertTriangle } from "@/components/ui/icons";

function KpiCard({ icon, title, value, color, iconBg }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  iconBg: string;
}) {
  return (
    <Card className="rounded-xl border bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={`flex size-10 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
          +8%
        </span>
      </div>
      <p className="mt-4 text-xs text-zinc-500">{title}</p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${color}`}>{value}</p>
      <p className="mt-1 text-[11px] text-zinc-400">vs yesterday</p>
    </Card>
  );
}

function ActivityItem({ title, subtitle, color }: {
  title: string;
  subtitle: string;
  color: "green" | "orange" | "blue";
}) {
  const colors = { green: "bg-green-500", orange: "bg-orange-500", blue: "bg-blue-500" };
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-50">
      <div className={`size-2 shrink-0 rounded-full ${colors[color]}`} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-zinc-500">{subtitle}</p>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <section className="relative z-10 -mt-6">
      <Card className="overflow-hidden rounded-2xl border shadow-xl">
        <div className="flex h-11 items-center gap-2 border-b bg-zinc-50/80 px-5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400" />
            <div className="size-2.5 rounded-full bg-yellow-400" />
            <div className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex h-7 flex-1 items-center rounded-lg border bg-white px-3">
            <span className="text-[11px] text-zinc-400">https://pulseops.app/dashboard</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-xs text-zinc-500">Tuesday, July 29</p>
              <h2 className="mt-0.5 text-xl font-bold">Operations Dashboard</h2>
            </div>
            <div className="flex size-9 items-center justify-center rounded-xl bg-black text-xs font-semibold text-white">
              PT
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <KpiCard icon={<Activity className="size-4 text-green-600" />} title="Health Score" value="92" color="text-green-600" iconBg="bg-green-100" />
            <KpiCard icon={<Clock3 className="size-4 text-orange-500" />} title="Pending Cases" value="5,180" color="text-orange-500" iconBg="bg-orange-100" />
            <KpiCard icon={<ShieldCheck className="size-4 text-blue-600" />} title="Settlement %" value="94.2" color="text-blue-600" iconBg="bg-blue-100" />
            <KpiCard icon={<AlertTriangle className="size-4 text-red-500" />} title="SLA" value="97.8%" color="text-red-500" iconBg="bg-red-100" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-xl border p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Settlement Trend</h3>
                  <p className="text-xs text-zinc-500">Last 7 days</p>
                </div>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                  +12.4%
                </span>
              </div>
              <div className="mt-4">
                <ChartLine />
              </div>
            </Card>

            <Card className="rounded-xl border p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent Activity</h3>
                <button className="text-xs font-medium text-blue-600">View all</button>
              </div>
              <div className="mt-4 space-y-0.5">
                <ActivityItem title="Payroll uploaded" subtitle="2 minutes ago" color="green" />
                <ActivityItem title="Settlement report generated" subtitle="18 minutes ago" color="green" />
                <ActivityItem title="12 invoices require review" subtitle="45 minutes ago" color="orange" />
                <ActivityItem title="Monthly reconciliation" subtitle="Today, 9:30 AM" color="blue" />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </section>
  );
}
