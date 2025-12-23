import { fetchApi } from "@/utils/fetch-api";

export const getMessages = async (chatId: string) => {
  const data = await fetchApi(`/messages?conversationId=${chatId}`);
  return data;
};
