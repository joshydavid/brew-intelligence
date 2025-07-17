"use client";

import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { useLoading } from "@/hooks/use-loading";
import { CLIENT_ROUTES } from "@/lib/constants/client-routes";
import { APP } from "@/lib/constants/metadata";
import { cn } from "@/lib/constants/utils";

export default function BrewIntelligenceBot() {
  const { isLoading, navigate } = useLoading();

  return (
    <div
      className={gradientBorderClass}
      role="button"
      tabIndex={0}
      onClick={() => navigate(CLIENT_ROUTES.BREW_INTELLIGENCE)}
    >
      <p
        className={cn(
          isLoading && "justify-center",
          "ml-4 flex p-4 text-gray-400 md:text-sm dark:text-gray-400",
        )}
      >
        {isLoading ? <HashLoaderSpinner /> : <>{APP.CTA}</>}
      </p>
    </div>
  );
}

export const gradientBorderClass = cn(
  "mx-auto max-w-2xl animate-border cursor-pointer rounded-full border border-transparent",
  "dark:[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]",
  "bg-gray-100",
);
