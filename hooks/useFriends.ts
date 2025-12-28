import {
  getFriendRequests,
  getFriends,
  getOutgoingFriendRequests,
} from "@/services/friends.service";
import { searchUsers } from "@/services/user.service";
import { FriendRequest, User } from "@/types";
import { useEffect, useState } from "react";

export const useFriends = (query?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (query?: string) => {
    const [usersRes, incomingRequestsRes, outgoingRequestsRes, friendsRes] =
      await Promise.all([
        searchUsers(query),
        getFriendRequests(),
        getOutgoingFriendRequests(),
        getFriends(),
      ]);

    const addableFriends = usersRes.filter(
      (user: User) =>
        user.id !== friendsRes.find((friend: User) => friend.id === user.id)?.id
    );

    setUsers(addableFriends);
    setIncomingRequests(incomingRequestsRes);
    setOutgoingRequests(outgoingRequestsRes);
    setFriends(friendsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return {
    users,
    incomingRequests,
    outgoingRequests,
    setFriends,
    setOutgoingRequests,
    setIncomingRequests,
    friends,
    loading,
  };
};
