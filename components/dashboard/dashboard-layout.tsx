import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";


export function DashboardLayout() {
  return (
    <main className="flex h-screen bg-zinc-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="flex-1 overflow-y-auto p-8">
          Dashboard Content
        </section>
      </div>
    </main>
  );
}