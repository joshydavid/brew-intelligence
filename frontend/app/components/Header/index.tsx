"use client";

import LoginX from "@/components/Authentication/LoginX";
import BackButton from "@/components/BackButton";
import { AppearanceToggle } from "@/components/ui/appearance-toggle";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { authData } = useAuthStatus();

  return (
    <header className="flex flex-row items-center justify-between px-4 py-6 md:px-6">
      <div>{pathname !== "/" && <BackButton />}</div>
      <div className="flex items-center gap-2">
        <LoginX name={authData?.name ?? ""} />
        <AppearanceToggle />
      </div>
    </header>
  );
}
