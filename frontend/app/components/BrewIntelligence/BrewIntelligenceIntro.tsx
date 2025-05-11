"use client";

import { Button } from "@/components/ui/button";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrewIntelligenceIntro() {
  const router = useRouter();
  return (
    <div className="col-span-2 flex justify-center lg:col-span-1">
      <Button
        size="lg"
        className="rounded-3xl"
        variant="outline"
        onClick={() => router.push(CLIENT_ROUTES.BREW_INTELLIGENCE)}
      >
        <Bot className="h-4 w-4" />
        Ask Brew Intelligence
      </Button>
    </div>
  );
}
