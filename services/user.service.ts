import { fetchApi } from "@/utils/fetch-api";

export const getUser = () => {
  return fetchApi(`/users/me`);
};

export const searchUsers = (query?: string) => {
  return fetchApi(`/users/search?q=${query ?? ""}`);
};

export const updateUser = (data: any) => {
  return fetchApi(`/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
