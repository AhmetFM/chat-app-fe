import { useActiveChat } from "@/context/ActiveChatContext";
import { useChatContext } from "@/context/ChatsContext";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

export const useChatListSocket = () => {
  const { setChats } = useChatContext();
  const { activeChatId } = useActiveChat();

  useEffect(() => {
    socket.on("message:new", ({ conversation }) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === conversation.id
            ? {
                ...chat,
                lastMessage: conversation.lastMessage,
                lastMessageAt: conversation.lastMessageAt,
                unreadCount:
                  chat.id === activeChatId ? 0 : chat.unreadCount! + 1,
              }
            : chat
        )
      );
    });

    return () => {
      socket.off("message:new");
    };
  }, [socket, activeChatId]);
};
