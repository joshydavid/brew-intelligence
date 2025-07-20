"use client";

import ParentWrapper from "@/bi/ParentWrapper";
import HashLoaderSpinner from "@/components/Spinner/HashLoaderSpinner";
import { Form } from "@/components/ui/form";
import Loader from "@/components/ui/loader";
import { useLLM } from "@/hooks/apis/use-llm";
import { useAutoScroll } from "@/hooks/use-autoscroll";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { FADE_DURATION, UP_NEXT } from "@/lib/constants/timings";
import { ChatUser, UserType } from "@/lib/constants/user-type";
import { aiChatSchema, AIChatSchema } from "@/schema/ai-chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChatHelperText, ChatInput, ChatLLM } from "./index";

export default function Chat() {
  const { showError, errorComponent, authLoading } = useProtectedRoute();
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
  if (showError) return errorComponent;
  if (authLoading)
    return (
      <ParentWrapper>
        <Loader />
      </ParentWrapper>
    );

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
          { sender: UserType.LLM_BOT, query: data.response },
        ]);
        setLoading(false);
        clearInterval(intervalId);
      },
      onError: (error) => console.error("Mutation failed:", error.message),
    });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-5xl flex-col p-5">
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
