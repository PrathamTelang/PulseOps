import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";

export function Hero() {
  return (
    <section className="flex flex-col items-center pt-24 pb-14 text-center">
      <span className="rounded-full border px-4 py-2 text-sm font-medium">
        ✨ {APP.name} Beta
      </span>

      <h1 className="mt-8 max-w-5xl text-6xl font-bold leading-tight tracking-tight lg:text-7xl">
  Turn operational
  <span className="block bg-gradient-to-r from-black via-gray-700 to-gray-400 bg-clip-text text-transparent">
    reports into decisions.
  </span>
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