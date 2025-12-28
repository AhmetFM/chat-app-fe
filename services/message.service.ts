import { fetchApi } from "@/utils/fetch-api";

export const getMessages = (chatId: string) => {
  const data = fetchApi(`/messages?conversationId=${chatId}`);
  return data;
};
