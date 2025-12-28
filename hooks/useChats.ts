import { useChatContext } from "@/context/ChatsContext";
import { getMyConversations } from "@/services/conversation.service";
import { Chat } from "@/types";
import { useEffect, useState } from "react";

const useChats = () => {
  const { setChats } = useChatContext();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChats = async () => {
    setLoading(true);
    await getMyConversations().then((res) => {
      setChats(
        res.map((c: Chat) => ({
          ...c,
          unreadCount: 0,
        }))
      );
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { loading };
};

export default useChats;
