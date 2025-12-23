import { getMyConversations } from "@/services/conversation.service";
import { useEffect, useState } from "react";

const useChats = () => {
  const [chats, setChats] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChats = async () => {
    setLoading(true);
    await getMyConversations().then((res) => {
      setChats(res);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, loading };
};

export default useChats;
