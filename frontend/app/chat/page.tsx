"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/constants/utils";
import { useState } from "react";
import ChatHelper from "./ChatHelper";
import ChatLLM from "./ChatLLM";

export default function Chat() {
  const [showHelper, setShowHelper] = useState<boolean>(true);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-2xl flex-col p-8">
      {showHelper ? <ChatHelper /> : <ChatLLM />}
      <footer className="rounded-lg">
        <Input
          className={cn(
            "md:text-md rounded-full text-sm text-gray-200 shadow-none focus:ring-0 focus-visible:ring-0 dark:text-gray-400",
            "mx-auto max-w-2xl animate-border border border-transparent",
            "[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]",
            "py-7 pl-7",
          )}
          placeholder="Why does my brew taste so bitter?"
        />
      </footer>
    </div>
  );
}
