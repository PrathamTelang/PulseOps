import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back">
      <DashboardView />
    </DashboardLayout>
  );
}
