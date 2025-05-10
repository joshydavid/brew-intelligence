"use client";

import LoginX from "@/components/Authentication/LoginX";
import BackButton from "@/components/BackButton";
import { AppearanceToggle } from "@/components/ui/appearance-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex flex-row items-center justify-between p-8">
      <div>{pathname !== "/" && <BackButton />}</div>
      <div className="flex items-center gap-2">
        <LoginX />
        <AppearanceToggle />
      </div>
    </header>
  );
}
