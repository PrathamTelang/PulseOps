import { Container } from "@/components/common/container";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Container>
        <Hero />
      </Container>
    </main>
  );
}