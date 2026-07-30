import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { CtaSection } from "@/components/landing/cta-section";
import { DashboardPreview } from "@/components/landing/preview";
import { PulseIcon } from "@/components/ui/icons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary">
              <PulseIcon className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">PulseOps</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <Hero />

      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <DashboardPreview />
        </div>
      </div>

      <Features />
      <CtaSection />

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PulseOps. Prototype for demonstration purposes.</p>
      </footer>
    </main>
  );
}
