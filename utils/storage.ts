import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "./api-config";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const deleteToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const refreshTokens = async (refreshToken: string) => {
  const apiUrl = getApiUrl();
  
  try {
    const result = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!result.ok) {
      const errorBody = await result.json().catch(() => null);
      throw new Error(errorBody?.message || `API Error: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("Network request failed")) {
      throw new Error(
        `Network request failed. Please check:\n` +
        `1. The server is running at ${apiUrl}\n` +
        `2. Your device/emulator can reach this IP address\n` +
        `3. Your network connection is active`
      );
    }
    throw error;
  }
};

export const getUserData = async (token: string) => {
  const apiUrl = getApiUrl();
  
  try {
    const result = await fetch(`${apiUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      const errorBody = await result.json().catch(() => null);
      throw new Error(errorBody?.message || `API Error: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("Network request failed")) {
      throw new Error(
        `Network request failed. Please check:\n` +
        `1. The server is running at ${apiUrl}\n` +
        `2. Your device/emulator can reach this IP address\n` +
        `3. Your network connection is active`
      );
    }
    throw error;
  }
};
