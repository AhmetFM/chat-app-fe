import { useSocket } from "@/context/SocketContext";
import { FriendRequest, User } from "@/types";
import { useEffect } from "react";

type Params = {
  setFriends: React.Dispatch<React.SetStateAction<User[]>>;
  setIncomingRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
  setOutgoingRequests: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
};

export const useFriendsSocket = ({
  setFriends,
  setIncomingRequests,
  setOutgoingRequests,
}: Params) => {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    // FRIEND REQUEST RECEIVED
    const handleFriendRequestReceived = (request: FriendRequest) => {
      setIncomingRequests((prev) => {
        if (prev.some((r) => r.id === request.id)) return prev;
        return [request, ...prev];
      });
    };

    //FRIEND REQUEST SEND (FOR DISABLE THE BUTTON)
    const handleFriendRequestSent = (payload: {
      requestId: string;
      receiverId: string;
    }) => {
      setOutgoingRequests((prev) => [
        ...prev,
        {
          id: payload.requestId,
          receiverId: payload.receiverId,
          status: "PENDING",
        } as FriendRequest,
      ]);
    };

    // FRIEND REQUEST REJECTED
    const handleFriendRequestRejected = (payload: { requestId: string }) => {
      setIncomingRequests((prev) =>
        prev.filter((r) => r.id !== payload.requestId)
      );

      setOutgoingRequests((prev) =>
        prev.filter((r) => r.id !== payload.requestId)
      );
    };

    // FRIEND REQUEST ACCEPTED
    const handleFriendRequestAccepted = (payload: {
      userId: string;
      friend: User;
    }) => {
      // Delete Incoming Request
      setIncomingRequests((prev) =>
        prev.filter((r) => r.senderId !== payload.userId)
      );

      // Delete Outgoing Request
      setOutgoingRequests((prev) =>
        prev.filter((r) => r.receiverId !== payload.userId)
      );

      // Add to friends list
      setFriends((prev) => {
        if (prev.some((f) => f.id === payload.userId)) return prev;
        return [...prev, payload.friend];
      });
    };

    socket.on("friend_request_received", handleFriendRequestReceived);
    socket.on("friend_request_sent", handleFriendRequestSent);
    socket.on("friend_request_rejected", handleFriendRequestRejected);
    socket.on("friend_request_accepted", handleFriendRequestAccepted);

    return () => {
      socket.off("friend_request_received", handleFriendRequestReceived);
      socket.off("friend_request_sent", handleFriendRequestSent);
      socket.off("friend_request_rejected", handleFriendRequestRejected);
      socket.off("friend_request_accepted", handleFriendRequestAccepted);
    };
  }, [socket, isConnected, setFriends, setIncomingRequests, setOutgoingRequests]);
};
