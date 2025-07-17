"use client";

import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/use-loading";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { BookOpen } from "lucide-react";

export default function ViewRecipesButton() {
  const { isLoading, navigate } = useLoading();

  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-3xl"
      onClick={() => navigate(CLIENT_ROUTES.COFFEE_RECIPES)}
      disabled={isLoading}
    >
      {isLoading ? (
        <HashLoaderSpinner />
      ) : (
        <>
          <BookOpen className="h-4 w-4" />
          <p className="text-xs md:text-sm">View Recipes</p>
        </>
      )}
    </Button>
  );
}
