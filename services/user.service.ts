import { fetchApi } from "@/utils/fetch-api";

export const getUser = () => {
  return fetchApi(`/users/me`);
};

export const searchUsers = (query?: string) => {
  return fetchApi(`/users/search?q=${query ?? ""}`);
};
