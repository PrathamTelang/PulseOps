import Link from "next/link";

import {
  LayoutDashboard,
  Upload,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Upload,
    label: "Uploads",
    href: "/dashboard/uploads",
  },
  {
    icon: FileSpreadsheet,
    label: "Reports",
    href: "/dashboard/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 p-6">
        <h1 className="text-2xl font-bold">
          PulseOps
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => (
          <Link
  href={item.href}
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-zinc-100"
>
  <item.icon size={18} />
  <span>{item.label}</span>
</Link>
        ))}
      </nav>
    </aside>
  );
}