import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-zinc-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-80 items-center rounded-xl border border-zinc-200 px-4">
          <Search size={18} className="mr-2 text-zinc-400" />

          <input
            placeholder="Search..."
            className="w-full outline-none"
          />
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200">
          <Bell size={18} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black font-semibold text-white">
          PT
        </div>
      </div>
    </header>
  );
}