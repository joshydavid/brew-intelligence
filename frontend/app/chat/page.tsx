"use client";

import BeatLoaderSpiner from "@/components/Spinner/BeatLoaderSpinner";
import { Form } from "@/components/ui/form";
import { useLLM } from "@/hooks/apis/use-llm";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { useAutoScroll } from "@/hooks/use-autoscroll";
import { ChatUser, UserType } from "@/lib/constants/user-type";
import { aiChatSchema, AIChatSchema } from "@/schema/ai-chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChatHelperText, ChatInput, ChatLLM } from "./index";

export default function Chat() {
  const { authData } = useAuthStatus();
  const [queries, setQueries] = useState<ChatUser[]>([]);
  // TODO: remove this, use react-query loading state
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useAutoScroll<HTMLDivElement>([queries, loading]);

  const chatForm = useForm<AIChatSchema>({
    resolver: zodResolver(aiChatSchema),
    defaultValues: {
      message: "",
    },
  });

  const { control, handleSubmit, reset } = chatForm;
  const { mutate } = useLLM();

  const onSubmit = (data: AIChatSchema) => {
    setQueries((prev) => [
      ...prev,
      { sender: UserType.User, query: data.message },
    ]);
    reset();
    setLoading(true);

    const requestBody = [{ parts: [{ text: data.message }] }];
    mutate(requestBody, {
      onSuccess: (data) => {
        console.log(data.response);

        setQueries((prev) => [
          ...prev,
          { sender: UserType.GROK_BOT, query: data.response },
        ]);

        setLoading(false);
      },
      onError: (error) => console.error("Mutation failed:", error.message),
    });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-5xl flex-col p-8">
      {queries.length > 0 ? (
        <>
          <ChatLLM queries={queries} />
          {loading && (
            <div className="mt-4 ml-2 flex items-center gap-1 italic md:ml-5 md:text-sm">
              Processing <BeatLoaderSpiner size={7} />{" "}
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
