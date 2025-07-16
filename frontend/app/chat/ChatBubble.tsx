import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/constants/utils";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  query: string;
  index: number;
  isUser: boolean;
  avatarSrc?: string;
  fallback: string;
}

const ANIMATION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function ChatBubble({
  query,
  index,
  isUser,
  avatarSrc,
  fallback,
}: ChatBubbleProps) {
  return (
    <motion.div
      key={index}
      initial={ANIMATION.initial}
      animate={ANIMATION.animate}
      exit={ANIMATION.exit}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "my-4 flex flex-col items-start gap-4 md:flex-row",
          isUser && "flex-row-reverse items-center",
        )}
      >
        <Avatar className="flex-shrink-0">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className="text-sm">{fallback}</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "max-w-2xl rounded-lg px-5 py-3.5 text-sm",
            isUser
              ? "bg-gray-100 dark:bg-gray-900 dark:text-white"
              : "bg-transparent px-0 py-0 dark:text-white",
          )}
        >
          {isUser ? (
            <p>{query}</p>
          ) : (
            <>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="mt-2 mb-1 text-lg font-bold" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="mt-2 mb-1 text-base font-semibold"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="mb-4 list-disc pl-5" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-3" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                }}
              >
                {DOMPurify.sanitize(query)}
              </ReactMarkdown>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
