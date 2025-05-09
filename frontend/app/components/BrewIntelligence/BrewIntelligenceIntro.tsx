import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export default function BrewIntelligenceIntro() {
  return (
    <div className="col-span-2 flex justify-center sm:col-span-1 lg:col-span-1">
      <Button size="lg" className="rounded-3xl" variant="outline">
        <Bot className="h-4 w-4" />
        Ask Brew Intelligence
      </Button>
    </div>
  );
}
