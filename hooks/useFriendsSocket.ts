import { FriendRequest, User } from "@/types";
import { socket } from "@/utils/socket";
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
  useEffect(() => {
    // FRIEND REQUEST RECEIVED
    socket.on("friend_request_received", (request: FriendRequest) => {
      setIncomingRequests((prev) => {
        if (prev.some((r) => r.id === request.id)) return prev;
        return [request, ...prev];
      });
    });

    //FRIEND REQUEST SEND (FOR DISABLE THE BUTTON)
    socket.on(
      "friend_request_sent",
      (payload: { requestId: string; receiverId: string }) => {
        setOutgoingRequests((prev) => [
          ...prev,
          {
            id: payload.requestId,
            receiverId: payload.receiverId,
            status: "PENDING",
          } as FriendRequest,
        ]);
      }
    );

    // FRIEND REQUEST REJECTED
    socket.on("friend_request_rejected", (payload: { requestId: string }) => {
      setIncomingRequests((prev) =>
        prev.filter((r) => r.id !== payload.requestId)
      );

      setOutgoingRequests((prev) =>
        prev.filter((r) => r.id !== payload.requestId)
      );
    });

    // FRIEND REQUEST ACCEPTED
    socket.on(
      "friend_request_accepted",
      (payload: { userId: string; friend: User }) => {
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
      }
    );

    return () => {
      socket.off("friend_request_received");
      socket.off("friend_request_sent");
      socket.off("friend_request_rejected");
      socket.off("friend_request_accepted");
    };
  }, []);
};
