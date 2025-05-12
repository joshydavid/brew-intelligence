export default function ChatHelper() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
        👋 Hey, I'm your{" "}
        <span className="text-blue-600 dark:text-blue-500">AI Barista.</span>
      </h1>
      <h1>
        Here to help you troubleshoot and perfect your coffee. Just tell me how
        you’re brewing — your method, dose, water, and timing — and I’ll guide
        you with tips, adjustments, and insights to help you make the best cup
        possible.
      </h1>
    </div>
  );
}
