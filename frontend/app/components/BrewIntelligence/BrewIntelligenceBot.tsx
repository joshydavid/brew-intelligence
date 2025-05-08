import { Input } from "@/components/ui/input";

export default function BrewIntelligenceBot() {
  return (
    <div className="mx-auto max-w-2xl">
      <Input
        placeholder="Analysing coffee grinds..."
        className="w-full rounded-full border border-gray-300 p-7 text-black outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}
