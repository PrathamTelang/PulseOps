import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-28 pb-20 text-center lg:px-8">
      <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium shadow-xs">
        <span className="flex size-2 rounded-full bg-green-500" />
        {APP.name} Beta &mdash; Now available
      </div>

      <h1 className="mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {APP.tagline.split("Executive ")[0]}
        <span className="block text-muted-foreground">Executive Insights</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
        {APP.description}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard">
          <Button size="lg" className="h-11 px-8 text-sm font-medium">
            Start Free
          </Button>
        </Link>
        <Link href="/dashboard/upload">
          <Button variant="outline" size="lg" className="h-11 px-8 text-sm font-medium">
            Book Demo
          </Button>
        </Link>
      </div>

      <div className="mt-16 flex items-center gap-8 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          No credit card
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          Instant setup
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          Works in browser
        </span>
      </div>
    </section>
  );
}
