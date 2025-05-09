import { cn } from "@/lib/constants/utils";

export default function BrewIntelligenceBot() {
  return (
    <div className={gradientBorderClass}>
      <p className="text-md ml-4 p-5 text-gray-200 dark:text-gray-400">
        Analysing coffee grinds...
      </p>
    </div>
  );
}

const gradientBorderClass = cn(
  "mx-auto max-w-2xl animate-border cursor-pointer rounded-full border border-transparent",
  "[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]",
);
