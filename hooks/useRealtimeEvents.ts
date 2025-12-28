import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";

export const useRealtimeEvents = ({
  onNewMessage,
  onConversationUpdated,
  onFriendRequest,
}: {
  onNewMessage?: (data: any) => void;
  onConversationUpdated?: (data: any) => void;
  onFriendRequest?: (data: any) => void;
}) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (onNewMessage) socket.on("new_message", onNewMessage);

    if (onConversationUpdated)
      socket.on("conversation_updated", onConversationUpdated);

    if (onFriendRequest) socket.on("friend_request_received", onFriendRequest);

    return () => {
      if (onNewMessage) socket.off("new_message", onNewMessage);

      if (onConversationUpdated)
        socket.off("conversation_updated", onConversationUpdated);

      if (onFriendRequest)
        socket.off("friend_request_received", onFriendRequest);
    };
  }, []);
};
