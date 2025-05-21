"use client";

import { Form } from "@/components/ui/form";
import { aiChatScehma, AIChatSchema } from "@/schema/ai-chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChatHelperText, ChatInput, ChatLLM } from "./index";

export default function Chat() {
  const [showHelper, setShowHelper] = useState<boolean>(true);
  const chatForm = useForm<AIChatSchema>({
    resolver: zodResolver(aiChatScehma),
    defaultValues: {
      message: "",
    },
  });

  const { control, handleSubmit, reset } = chatForm;

  const onSubmit = (data: AIChatSchema) => {
    console.log("Sent:", data.message);
    reset();
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-2xl flex-col p-8">
      {showHelper ? <ChatHelperText /> : <ChatLLM />}
      <Form {...chatForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex items-center gap-2"
        >
          <ChatInput control={control} />
        </form>
      </Form>
    </div>
  );
}
