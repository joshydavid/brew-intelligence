"use client";

import BeatLoaderSpiner from "@/components/Spinner/BeatLoaderSpinner";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/use-loading";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { Coffee } from "lucide-react";

export default function ViewBeansButton() {
  const { isLoading, navigate } = useLoading();

  return (
    <Button
      variant="outline"
      className="rounded-3xl"
      size="lg"
      onClick={() => navigate(CLIENT_ROUTES.COFFEE_LISTINGS)}
      disabled={isLoading}
    >
      {isLoading ? <BeatLoaderSpiner /> : <Coffee className="mr-2 h-4 w-4" />}
      {!isLoading && "View Beans"}
    </Button>
  );
}
