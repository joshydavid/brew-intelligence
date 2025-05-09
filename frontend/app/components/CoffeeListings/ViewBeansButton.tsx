"use client";

import { Button } from "@/components/ui/button";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewBeansButton() {
  const router = useRouter();
  return (
    <Button
      size="lg"
      onClick={() => router.push(CLIENT_ROUTES.COFFEE_LISTINGS)}
    >
      <Coffee className="h-4 w-4" />
      View Beans
    </Button>
  );
}
