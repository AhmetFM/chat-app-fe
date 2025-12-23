import { fetchApi } from "@/utils/fetch-api";

export const getMyConversations = async () => {
  return await fetchApi("/conversations");
};

export const createOrGetConversation = async (id: string) => {
  return await fetchApi("/conversations", {
    method: "POST",
    body: JSON.stringify({
      userId: id,
    }),
  });
};
