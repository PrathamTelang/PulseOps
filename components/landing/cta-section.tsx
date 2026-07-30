import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-12 text-center shadow-sm lg:p-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to transform your operations?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Upload your first report in seconds. No signup, no credit card.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="h-11 px-8 text-sm font-medium">
              Get Started Free
            </Button>
          </Link>
          <Link href="/dashboard/upload">
            <Button variant="outline" size="lg" className="h-11 px-8 text-sm font-medium">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
