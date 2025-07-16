"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import BeatLoaderSpiner from "@/components/Spinner/BeatLoaderSpinner";
import { Form } from "@/components/ui/form";
import { useLLM } from "@/hooks/apis/use-llm";
import { useAuthStatus } from "@/hooks/use-auth-status";
import { useAutoScroll } from "@/hooks/use-autoscroll";
import { API_ERROR_MESSAGE } from "@/lib/constants/error-message";
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
        setQueries((prev) => [
          ...prev,
          { sender: UserType.GROK_BOT, query: data.response },
        ]);
        setLoading(false);
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
