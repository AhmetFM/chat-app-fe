import { AuthContext } from "@/context/AuthContext";
import { getMessages } from "@/services/message.service";
import { socket } from "@/utils/socket";
import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const useChat = (conversationId: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { userToken, userId } = useContext(AuthContext);

  // Initial fetch
  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(conversationId);

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

  //Socket lifecycle
  useEffect(() => {
    socket.auth = { token: userToken };

    socket.connect();

    socket.emit("join_conversation", conversationId);

    socket.on("new_message", (message) => {
      console.log("new message ", message);
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
    });

    return () => {
      socket.emit("leave-conversation", conversationId);
      socket.off("new_message");
      socket.disconnect();
    };
  }, [conversationId]);

  const sendMessage = useCallback((messages: IMessage[]) => {
    const message = messages[0];

    // optimistic UI
    setMessages((prev) => GiftedChat.append(prev, messages));

    socket.emit("send_message", {
      conversationId,
      content: message.text,
    });
  }, []);

  return { messages, sendMessage, userId };
};

export default useChat;
