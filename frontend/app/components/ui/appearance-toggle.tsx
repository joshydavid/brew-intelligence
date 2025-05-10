"use client";

import { Theme } from "@/lib/constants/theme";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function AppearanceToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <Button variant="outline" size="md" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <Moon className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
