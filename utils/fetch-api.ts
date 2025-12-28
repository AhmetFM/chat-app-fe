import { getToken } from "./storage";

const API_URL = "http://192.168.68.109:3000";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
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
