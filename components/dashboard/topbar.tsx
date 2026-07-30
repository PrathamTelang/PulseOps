"use client";

import { Bell, Search } from "@/components/ui/icons";
import { Avatar } from "@/components/ui/avatar";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 max-md:px-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-56 items-center gap-2 rounded-xl border bg-background px-3 text-sm text-muted-foreground max-md:hidden">
          <Search className="size-4" />
          <span>Search...</span>
        </div>

        <button className="flex size-9 items-center justify-center rounded-xl border bg-background text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="size-4" />
        </button>

        <Avatar initials="PT" className="size-9 text-xs" />
      </div>
    </header>
  );
}
