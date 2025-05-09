"use client";

import { SignInButton } from "@/components/Authentication/SignInButton";
import BackButton from "@/components/BackButton";
import { AppearanceToggle } from "@/components/ui/appearance-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex flex-row items-center justify-between p-8">
      <div>{pathname !== "/" && <BackButton />}</div>
      <div className="flex gap-4">
        <SignInButton dialogButton="Sign In" />
        <AppearanceToggle />
      </div>
    </header>
  );
}
