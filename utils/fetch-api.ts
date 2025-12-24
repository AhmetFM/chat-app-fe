import { getToken } from "./storage";

//101

const API_URL = "http://192.168.68.109:3000";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
    });

    if (!res.ok) {
      console.log("API_ERROR", res.status);
      throw new Error("Something went wrong");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
