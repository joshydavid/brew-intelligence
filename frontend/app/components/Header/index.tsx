"use client";

import LoginX from "@/components/Authentication/LoginX";
import BackButton from "@/components/BackButton";
import BannerComponent from "@/components/Banner";
import { AppearanceToggle } from "@/components/ui/appearance-toggle";

import { useAuthStatus } from "@/hooks/use-auth-status";
import { usePathname } from "next/navigation";
import BannerComponent from "../Banner";

export default function Header() {
  const pathname = usePathname();
  const { authData } = useAuthStatus();
  const showBanner = process.env.NEXT_PUBLIC_NOTIFICATION_BANNER === "true";

  return (
    <>
      {showBanner && (
        <BannerComponent
          title={
            process.env.NEXT_PUBLIC_BANNER_MESSAGE ||
            "Notice: AWS resources have been spun down. The backend is currently not running."
          }
        />
      )}
      <header className="flex flex-row items-center justify-between px-4 py-6 md:px-6">
        <div>{pathname !== "/" && <BackButton />}</div>
        <div className="flex items-center gap-2">
          <LoginX name={authData?.name ?? ""} />
          <AppearanceToggle />
        </div>
      </header>
    </>
  );
}
