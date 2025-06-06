import { APP_AI } from "@/lib/constants/metadata";

export default function ChatHelperText() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-2">
      <h1 className="text-4xl text-gray-900 dark:text-white">
        👋 Hey, I'm your{" "}
        <span className="text-blue-600 dark:text-blue-500">AI Barista.</span>
      </h1>
      <p className="text-sm md:text-lg">{APP_AI.LONG_DESCRIPTION}</p>
    </div>
  );
}
