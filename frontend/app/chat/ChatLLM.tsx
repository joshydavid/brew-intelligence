import { useAuthStatus } from "@/hooks/use-auth-status";
import { ChatUser, UserType } from "@/lib/constants/user-type";
import { AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";

interface ChatLLMProps {
  queries: ChatUser[];
}

export default function ChatLLM({ queries }: ChatLLMProps) {
  const { authData } = useAuthStatus();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <AnimatePresence initial={false}>
        {queries.map(({ sender, query }, index) => {
          const isUser = sender === UserType.User;
          return (
            <ChatBubble
              key={index}
              query={query}
              index={index}
              isUser={isUser}
              fallback={isUser ? (authData?.name[0].toUpperCase() ?? "A") : "A"}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
