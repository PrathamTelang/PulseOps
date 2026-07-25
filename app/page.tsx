export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <p className="text-sm font-medium text-gray-500">
          PulseOps
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight">
          Turn operational reports into actionable insights.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Upload your daily Excel report and instantly discover what
          actually needs your attention.
        </p>

        <button className="mt-10 rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90">
          Upload Report
        </button>
      </section>
    </main>
  );
}