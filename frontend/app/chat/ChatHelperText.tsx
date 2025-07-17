import { APP_AI } from "@/lib/constants/metadata";

export default function ChatHelperText() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-blue-600 dark:text-blue-500">
        Brew Intelligently.
      </h1>
      <p className="text-sm text-gray-600 md:text-lg dark:text-gray-200">
        {APP_AI.LONG_DESCRIPTION}
      </p>
    </div>
  );
}
