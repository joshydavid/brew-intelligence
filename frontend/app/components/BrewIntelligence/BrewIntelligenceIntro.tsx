"use client";

import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/use-loading";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { Bot } from "lucide-react";
import BeatLoaderSpiner from "../Spinner/BeatLoaderSpinner";

export default function BrewIntelligenceIntro() {
  const { isLoading, navigate } = useLoading();

  return (
    <div className="col-span-2 flex justify-center lg:col-span-1">
      <Button
        size="lg"
        className="w-[200px] rounded-3xl"
        variant="outline"
        onClick={() => navigate(CLIENT_ROUTES.BREW_INTELLIGENCE)}
        disabled={isLoading}
      >
        {isLoading ? (
          <BeatLoaderSpiner />
        ) : (
          <>
            <Bot className="h-4 w-4" />
            <p className="text-xs md:text-sm">Ask Brew Intelligence</p>
          </>
        )}
      </Button>
    </div>
  );
}
