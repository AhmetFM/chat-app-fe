import { getToken } from "./storage";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const token = await getToken();

  const res = await fetch(`${"http://192.168.68.110:3000"}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);

    throw new Error(errorBody?.message || `API Error : ${res.status}`);
  }

  return res.json();
};
