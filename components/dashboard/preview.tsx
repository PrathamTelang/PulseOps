import { Card } from "@/components/ui/card";
import { SettlementChart } from "@/components/charts/settlement-chart";
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="relative -mt-6 z-10">
      <Card className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_60px_120px_rgba(15,23,42,0.15)]">
        {/* Browser Header */}
        {/* Browser Header */}
<div className="flex h-14 items-center border-b border-zinc-100 bg-white/80 px-5 backdrop-blur-md">
  <div className="flex w-full items-center gap-4">
    <div className="flex gap-2">
      <div className="h-3 w-3 rounded-full bg-red-400" />
      <div className="h-3 w-3 rounded-full bg-yellow-400" />
      <div className="h-3 w-3 rounded-full bg-green-400" />
    </div>

    <div className="flex h-9 flex-1 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-4">
      <span className="text-xs text-zinc-500">
        https://pulseops.app/dashboard
      </span>
    </div>
  </div>
</div>

        <div className="bg-linear-to-b from-white to-zinc-50 p-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
            <div>
              <p className="text-sm text-zinc-500">
                Tuesday, July 29
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                Operations Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Search employee..."
                className="h-11 w-72 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-600 shadow-sm outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
                PT
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <KpiCard
  icon={<Activity size={18} />}
  title="Health Score"
  value="92"
  color="text-green-600"
  iconBg="bg-green-100"
/>

            <KpiCard
  icon={<Clock3 size={18} />}
  title="Pending"
  value="5,180"
  color="text-orange-500"
  iconBg="bg-orange-100"
/>

            <KpiCard
  icon={<ShieldCheck size={18} />}
  title="SLA"
  value="94%"
  color="text-blue-600"
  iconBg="bg-blue-100"
/>

            <KpiCard
  icon={<AlertTriangle size={18} />}
  title="Risk"
  value="24"
  color="text-red-500"
  iconBg="bg-red-100"
/>
          </div>

          {/* Bottom */}
          {/* Bottom */}
<div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

  {/* Settlement Trend */}
  <Card className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">
          Settlement Trend
        </h3>

        <p className="text-sm text-zinc-500">
          Last 7 days
        </p>
      </div>

      <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
        +12.4%
      </span>
    </div>

    <div className="mt-6">
      <SettlementChart />
    </div>
  </Card>

  {/* Activity */}
  <Card className="rounded-2xl border border-zinc-200/80 p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">
        Recent Activity
      </h3>

      <button className="text-sm font-medium text-blue-600">
        View all
      </button>
    </div>

    <div className="mt-6 space-y-5">
      <ActivityItem
        title="Payroll uploaded"
        subtitle="2 minutes ago"
        status="Completed"
        color="green"
      />

      <ActivityItem
        title="Settlement report generated"
        subtitle="18 minutes ago"
        status="Completed"
        color="green"
      />

      <ActivityItem
        title="12 invoices require review"
        subtitle="45 minutes ago"
        status="Pending"
        color="orange"
      />

      <ActivityItem
        title="Monthly reconciliation"
        subtitle="Today, 9:30 AM"
        status="In Progress"
        color="blue"
      />
    </div>
  </Card>

</div>
        </div>
      </Card>
    </section>
  );
}

function KpiCard({
  icon,
  title,
  value,
  color,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  iconBg: string;
}) {
  return (
    <Card className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <div
  className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
>
  {icon}
</div>

        <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
          ↑ 8%
        </span>
      </div>

      <p className="mt-5 text-sm text-zinc-500">
        {title}
      </p>

      <h2 className={`mt-2 text-4xl font-bold tracking-tight ${color}`}>
        {value}
      </h2>

      <p className="mt-2 text-xs text-zinc-400">
        vs yesterday
      </p>
    </Card>
  );
}

function ActivityItem({
  title,
  subtitle,
  status,
  color,
}: {
  title: string;
  subtitle: string;
  status: string;
  color: "green" | "orange" | "blue";
}) {
  const colors = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-100 p-3 transition hover:bg-zinc-50">
      <div className="flex items-center gap-3">
        <div className={`h-2.5 w-2.5 rounded-full ${colors[color]}`} />

        <div>
          <p className="font-medium text-zinc-900">
            {title}
          </p>

          <p className="text-sm text-zinc-500">
            {subtitle}
          </p>
        </div>
      </div>

      <span className="text-xs font-medium text-zinc-500">
        {status}
      </span>
    </div>
  );
}