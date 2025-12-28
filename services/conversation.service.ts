import { fetchApi } from "@/utils/fetch-api";

export const getMyConversations = () => {
  return fetchApi("/conversations");
};

export const createOrGetConversation = (id: string) => {
  return fetchApi("/conversations", {
    method: "POST",
    body: JSON.stringify({
      userId: id,
    }),
  });
};
