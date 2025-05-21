import { AIChatMessage } from "@/lib/constants/error-message";
import { z } from "zod";

export const aiChatSchema = z.object({
  message: z
    .string()
    .min(1, AIChatMessage.MESSAGE_REQUIRED)
    .max(500, AIChatMessage.MAX_CHARACTERS_500),
});

export type AIChatSchema = z.infer<typeof aiChatSchema>;
