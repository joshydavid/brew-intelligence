export enum UserType {
  User = "User",
  GROK_BOT = "grokBot",
}

export interface ChatUser {
  sender: UserType;
  query: string;
}
