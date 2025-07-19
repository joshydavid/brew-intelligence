"use client";

import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/use-loading";

interface ViewButtonProps {
  clientRoute: string;
  btnIcon: any;
  btnName: string;
}

export default function ViewButton({
  clientRoute,
  btnIcon,
  btnName,
}: ViewButtonProps) {
  const { isLoading, navigate } = useLoading();
  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-3xl"
      onClick={() => navigate(clientRoute)}
      disabled={isLoading}
    >
      {isLoading ? (
        <HashLoaderSpinner />
      ) : (
        <>
          {btnIcon}
          <p className="text-xs md:text-sm">{btnName}</p>
        </>
      )}
    </Button>
  );
}
