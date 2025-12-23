import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const result = await fetch("http://192.168.1.11:3000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  }).then((res) => res.json());
  return result;
};

export const getUserData = async (token: string) => {
  return await fetch("http://192.168.1.11:3000/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
