export const APP = {
  name: "PulseOps",
  tagline: "Transform Operational Reports into Executive Insights",
  description: "Upload Excel reports and instantly generate dashboards, KPIs, trends and AI-powered operational insights.",
};

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Upload", href: "/dashboard/upload", icon: "Upload" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
  { label: "Reports", href: "/dashboard/reports", icon: "FileSpreadsheet" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

export const ACTIVITIES = [
  { title: "Payroll uploaded", subtitle: "2 minutes ago", status: "Completed" as const, color: "green" as const },
  { title: "Settlement report generated", subtitle: "18 minutes ago", status: "Completed" as const, color: "green" as const },
  { title: "SLA breach detected", subtitle: "32 minutes ago", status: "Pending" as const, color: "orange" as const },
  { title: "Monthly reconciliation started", subtitle: "Today, 9:30 AM", status: "In Progress" as const, color: "blue" as const },
  { title: "Dashboard refreshed", subtitle: "Today, 8:00 AM", status: "Completed" as const, color: "green" as const },
  { title: "12 invoices require review", subtitle: "Yesterday, 4:15 PM", status: "Pending" as const, color: "orange" as const },
];

export const DEMO_KPIS = [
  { label: "Health Score", value: "92", change: 8, icon: "Activity", color: "text-green-600", bgColor: "bg-green-100" },
  { label: "Pending Cases", value: "5,180", change: -3, icon: "Clock3", color: "text-orange-500", bgColor: "bg-orange-100" },
  { label: "Settlement %", value: "94.2", change: 12.4, icon: "ShieldCheck", color: "text-blue-600", bgColor: "bg-blue-100" },
  { label: "SLA", value: "97.8%", change: 2.1, icon: "AlertTriangle", color: "text-emerald-600", bgColor: "bg-emerald-100" },
];
