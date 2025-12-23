import { getFriendRequests, getFriends } from "@/services/friends.service";
import { searchUsers } from "@/services/user.service";
import { FriendRequest, User } from "@/types";
import { useEffect, useState } from "react";

export const useFriends = (query?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);

    const [usersRes, requestsRes, friendsRes] = await Promise.all([
      searchUsers(query),
      getFriendRequests(),
      getFriends(),
    ]);

    const addableFriends = usersRes.filter(
      (user: User) =>
        user.id !== friendsRes.find((friend: User) => friend.id === user.id)?.id
    );

    setUsers(addableFriends);
    setRequests(requestsRes);
    setFriends(friendsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return { users, requests, friends, loading, refresh: fetchData };
};
