import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/constants/utils";
import { motion } from "framer-motion";

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
        className={cn("flex items-center gap-2", isUser && "flex-row-reverse")}
      >
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className="text-sm">{fallback}</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "max-w-md rounded-lg px-3 py-2 text-sm break-all",
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black",
          )}
        >
          {query}
        </div>
      </div>
    </motion.div>
  );
}
