export enum UserType {
  User = "User",
  LLM_BOT = "llmBot",
}

export interface ChatUser {
  sender: UserType;
  query: string;
}
