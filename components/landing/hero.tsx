import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";

export function Hero() {
  return (
    <section className="flex flex-col items-center py-24 text-center">
      <span className="rounded-full border px-4 py-2 text-sm font-medium">
        ✨ {APP.name} Beta
      </span>

      <h1 className="mt-8 max-w-5xl text-6xl font-bold tracking-tight">
        Turn operational reports
        <br />
        into clear decisions.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Upload Excel reports and instantly discover bottlenecks,
        high-risk teams, and operational insights.
      </p>

      <div className="mt-10 flex gap-4">
        <Button size="lg">
          Upload Report
        </Button>

        <Button
          variant="outline"
          size="lg"
        >
          Try Demo
        </Button>
      </div>
    </section>
  );
}