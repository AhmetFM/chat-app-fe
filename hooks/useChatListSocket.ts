import { useActiveChat } from "@/context/ActiveChatContext";
import { useChatContext } from "@/context/ChatsContext";
import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";

export const useChatListSocket = () => {
  const { setChats } = useChatContext();
  const { activeChatId } = useActiveChat();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    const handleMessageNew = ({ conversation }: { conversation: any }) => {
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
    };

    socket.on("message:new", handleMessageNew);

    return () => {
      socket.off("message:new", handleMessageNew);
    };
  }, [socket, isConnected, activeChatId, setChats]);
};
