"use client";

import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
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
      {isLoading ? (
        <HashLoaderSpinner />
      ) : (
        <>
          <Coffee className="h-4 w-4" />{" "}
          <p className="text-xs md:text-sm">View Beans</p>
        </>
      )}
    </Button>
  );
}
