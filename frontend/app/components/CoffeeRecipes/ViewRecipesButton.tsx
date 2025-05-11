"use client";

import { Button } from "@/components/ui/button";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewRecipesButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-3xl"
      onClick={() => router.push(CLIENT_ROUTES.COFFEE_RECIPES)}
    >
      <BookOpen className="h-4 w-4" />
      View Recipes
    </Button>
  );
}
