import { Container } from "@/components/common/container";
import { Hero } from "@/components/landing/hero";
import { DashboardPreview } from "@/components/dashboard/preview";
import { UploadCard } from "@/components/landing/upload-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Container>
        <Hero />
        <DashboardPreview />
        <UploadCard />
      </Container>
    </main>
  );
}