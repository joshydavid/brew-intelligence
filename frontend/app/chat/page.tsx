"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { Form } from "@/components/ui/form";
import { useLLM } from "@/hooks/apis/use-llm";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { useAutoScroll } from "@/hooks/use-autoscroll";
import { API_ERROR_MESSAGE } from "@/lib/constants/error-message";
import { FADE_DURATION, UP_NEXT } from "@/lib/constants/timings";
import { ChatUser, UserType } from "@/lib/constants/user-type";
import Restricted from "@/public/restricted.png";
import { aiChatSchema, AIChatSchema } from "@/schema/ai-chat";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChatHelperText, ChatInput, ChatLLM } from "./index";

export default function Chat() {
  const { authData } = useAuthStatus();
  const [queries, setQueries] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loadingSteps = [
    "Processing...",
    "Thinking...",
    "Be patient...",
    "Almost done...",
  ];
  const [loadingMessage, setLoadingMessage] = useState(loadingSteps[0]);
  const [fade, setFade] = useState(false);
  const messagesEndRef = useAutoScroll<HTMLDivElement>([queries, loading]);

  const chatForm = useForm<AIChatSchema>({
    resolver: zodResolver(aiChatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { control, handleSubmit, reset } = chatForm;
  const { mutate } = useLLM();

  const queryAnimate = () => {
    let i = 0;
    const intervalId = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLoadingMessage(loadingSteps[i % loadingSteps.length]);
        setFade(false);
      }, FADE_DURATION);
      i++;
    }, UP_NEXT);
    return intervalId;
  };

  const onSubmit = (data: AIChatSchema) => {
    setQueries((prev) => [
      ...prev,
      { sender: UserType.User, query: data.message },
    ]);
    reset();
    setLoading(true);

    const intervalId = queryAnimate();
    const requestBody = [{ parts: [{ text: data.message }] }];
    mutate(requestBody, {
      onSuccess: (data) => {
        setQueries((prev) => [
          ...prev,
          { sender: UserType.GROK_BOT, query: data.response },
        ]);
        setLoading(false);
        clearInterval(intervalId);
      },
      onError: (error) => console.error("Mutation failed:", error.message),
    });
  };

  if (authData === undefined) {
    return (
      <ErrorMessage
        image={
          <Image src={Restricted} alt="not-found" width={500} height={500} />
        }
        statusCode={403}
        header="Forbidden"
        message={API_ERROR_MESSAGE.ERROR_403_FORBIDDEN}
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-5xl flex-col p-8">
      {queries.length > 0 ? (
        <>
          <ChatLLM queries={queries} />
          {loading && (
            <div className="flex items-center gap-4 text-muted-foreground">
              <HashLoaderSpinner />
              <span
                className={`transition-opacity duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                {loadingMessage}
              </span>
            </div>
          )}
        </>
      ) : (
        <ChatHelperText />
      )}
      <div ref={messagesEndRef}>
        <Form {...chatForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2"
          >
            <ChatInput control={control} />
          </form>
        </Form>
      </div>
    </div>
  );
}
