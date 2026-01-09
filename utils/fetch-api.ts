import { getApiUrl } from "./api-config";
import { getToken } from "./storage";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const apiUrl = getApiUrl();

  const token = await getToken();

  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
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
  } catch (error) {
    // Handle network errors (server unreachable, wrong IP, etc.)
    if (error instanceof TypeError && error.message.includes("Network request failed")) {
      throw new Error(
        `Network request failed. Please check:\n` +
        `1. The server is running at ${apiUrl}\n` +
        `2. Your device/emulator can reach this IP address\n` +
        `3. Your network connection is active`
      );
    }
    // Re-throw other errors as-is
    throw error;
  }
};
