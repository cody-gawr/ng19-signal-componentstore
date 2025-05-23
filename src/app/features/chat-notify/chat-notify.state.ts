export interface ChatNotifyState {
  connected: boolean;
  messages: ChatMessage[];
}

export interface ChatMessage {
  user: string;
  message: string;
}
