import { RespondFriendRequestEnum } from "@/types";
import { fetchApi } from "@/utils/fetch-api";

export const getFriends = () => {
  return fetchApi("/friends");
};

export const getFriendRequests = () => {
  return fetchApi("/friends/requests");
};

export const getSendedFriendRequests = () => {
  return fetchApi("/friends/requests/me");
};

export const sendFriendRequest = (userId: string) => {
  return fetchApi(`/friends/request/${userId}`, {
    method: "POST",
  });
};

export const respondFriendRequest = (
  requestId: string,
  respondRequest: RespondFriendRequestEnum
) => {
  return fetchApi(`/friends/respond/${requestId}`, {
    method: "POST",
    body: JSON.stringify({
      action: respondRequest,
    }),
  });
};
