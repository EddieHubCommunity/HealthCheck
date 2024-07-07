import Tagline from "@/components/Tagline";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>HealthCheck</h1>
      <Tagline />
      <Welcome />
    </main>
  );
}
