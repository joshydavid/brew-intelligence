import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_AI } from "@/lib/constants/metadata";
import { cn } from "@/lib/constants/utils";
import { Send } from "lucide-react";
import { Controller } from "react-hook-form";

export default function ChatInput({ control }: { control: any }) {
  return (
    <Controller
      name="message"
      control={control}
      render={({ field }) => (
        <div className="mt-6 flex w-full justify-center">
          <div className="relative w-full md:w-3/4">
            <Input
              {...field}
              className={cn(
                "md:text-md rounded-full text-sm text-gray-600 shadow-none focus:ring-0 focus-visible:ring-0 md:text-sm dark:text-gray-400",
                "mx-auto max-w-2xl animate-border border border-transparent",
                "dark:[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]",
                "bg-gray-100",
                "py-7 pr-18 pl-7",
              )}
              placeholder={APP_AI.INPUT_PLACEHOLDER}
            />
            <Button
              type="submit"
              variant="ghost"
              className="absolute top-1/2 right-3 flex -translate-y-1/2 text-muted-foreground hover:text-foreground md:right-10"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    />
  );
}
