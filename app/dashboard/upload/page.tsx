import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UploadSection } from "@/components/dashboard/upload-section";

export default function UploadPage() {
  return (
    <DashboardLayout title="Upload" subtitle="Upload operational reports">
      <div className="px-6 py-8 max-md:px-4">
        <div className="mx-auto max-w-5xl">
          <UploadSection />
        </div>
      </div>
    </DashboardLayout>
  );
}
