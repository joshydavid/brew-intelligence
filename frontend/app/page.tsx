import BrewIntelligenceBot from "./components/BrewIntelligence/BrewIntelligenceBot";
import LandingIntro from "./components/LandingIntro/LandingIntro";
import { AppearanceToggle } from "./components/ui/appearance-toggle";
import { ResponsiveDialog } from "./components/ui/responsive-dialog";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col p-8">
      <header className="mb-8 flex flex-row justify-end gap-4">
        <ResponsiveDialog dialogButton="Sign In" />
        <AppearanceToggle />
      </header>
      <div className="flex flex-1 items-center justify-center">
        <LandingIntro />
      </div>
      <footer className="mt-8 rounded-lg">
        <BrewIntelligenceBot />
      </footer>
    </main>
  );
}
