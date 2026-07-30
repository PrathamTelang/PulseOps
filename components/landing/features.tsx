import { BarChart3, Upload, Sparkles, FileSpreadsheet, LayoutDashboard, ShieldCheck } from "@/components/ui/icons";

const features = [
  {
    icon: Upload,
    title: "Excel Upload",
    description: "Drag & drop your operational reports. No setup, no integrations.",
  },
  {
    icon: BarChart3,
    title: "Auto Charts",
    description: "Charts generated from your data — trends, distributions, and comparisons.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Automatically detect anomalies, trends, and patterns in your operations data.",
  },
  {
    icon: LayoutDashboard,
    title: "Executive Dashboard",
    description: "KPI cards, health scores, and real-time metrics at a glance.",
  },
  {
    icon: FileSpreadsheet,
    title: "Report Export",
    description: "Export dashboards as PDF or raw data as CSV with one click.",
  },
  {
    icon: ShieldCheck,
    title: "100% In-Browser",
    description: "Your data never leaves your machine. No servers, no storage.",
  },
];

export function Features() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need to analyze operations
          </h2>
          <p className="mt-4 text-muted-foreground">
            No setup. No data uploads to the cloud. Just instant insights.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/5 transition-colors">
                <feature.icon className="size-5 text-foreground" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
