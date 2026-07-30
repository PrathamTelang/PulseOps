"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Upload, BarChart3, FileSpreadsheet, Settings, PulseIcon,
} from "@/components/ui/icons";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Upload, label: "Upload", href: "/dashboard/upload" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileSpreadsheet, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-card max-md:hidden">
      <div className="flex items-center gap-2.5 border-b px-6 py-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
          <PulseIcon className="size-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight">PulseOps</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            PT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Demo User</p>
            <p className="text-xs text-muted-foreground truncate">demo@pulseops.app</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
