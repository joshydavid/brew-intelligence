import BrewIntelligenceBot from "./components/BrewIntelligence/BrewIntelligenceBot";
import LandingIntro from "./components/LandingIntro/LandingIntro";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-100px)] w-screen flex-col p-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <LandingIntro />
      </div>
      <footer className="rounded-lg">
        <BrewIntelligenceBot />
      </footer>
    </main>
  );
}
