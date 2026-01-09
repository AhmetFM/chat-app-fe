import { AuthContext } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { getMyConversations } from "@/services/conversation.service";
import { getMessages } from "@/services/message.service";
import { User } from "@/types";
import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const useChat = (conversationId: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [otherUser, setOtherUser] = useState<User>();
  const { userToken, user } = useContext(AuthContext);
  const { socket, isConnected } = useSocket();

  // Initial fetch
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const conversations = await getMyConversations();
      const data = await getMessages(conversationId);

      const currentConversation = conversations.filter(
        (c: any) => c.id === conversationId
      );

      const otherUser =
        currentConversation[0].userAId === user?.id
          ? currentConversation[0].userB
          : currentConversation[0].userA;

      setOtherUser(otherUser);

      const formatted = data.map((message: any) => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.senderId,
        },
      }));

      if (formatted.length === 0) {
        formatted.push({
          _id: 0,
          system: true,
          text: "All your base are belongs to us",
          createdAt: new Date(),
          user: {
            _id: 0,
            name: "Bot",
          },
        });
      }

      setMessages(formatted);
    };
    fetchMessages();
  }, [conversationId]);

  //Socket lifecycle - wait for connection before setting up listeners
  useEffect(() => {
    if (!conversationId || !userToken || !isConnected) return;

    // Join the conversation room
    socket.emit("join_conversation", conversationId);

    // Set up message listeners
    const handleNewMessage = (message: any) => {
      setMessages((prev) =>
        GiftedChat.append(prev, [
          {
            _id: message.id,
            text: message.content,
            createdAt: new Date(message.createdAt),
            user: { _id: message.senderId },
          },
        ])
      );
    };

    const handleMessageNew = () => {
      console.log("Screen Received");
    };

    socket.on("new_message", handleNewMessage);
    socket.on("message:new", handleMessageNew);

    return () => {
      socket.emit("leave-conversation", conversationId);
      socket.off("new_message", handleNewMessage);
      socket.off("message:new", handleMessageNew);
    };
  }, [conversationId, userToken, isConnected, socket]);

  const sendMessage = useCallback((messages: IMessage[]) => {
    const message = messages[0];

    // optimistic UI
    setMessages((prev) => GiftedChat.append(prev, messages));

    socket.emit("send_message", {
      conversationId,
      content: message.text,
    });
  }, []);

  return { messages, sendMessage, user, otherUser };
};

export default useChat;
