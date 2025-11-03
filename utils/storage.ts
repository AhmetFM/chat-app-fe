import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const deleteToken = async (token: string) => {
  await AsyncStorage.removeItem("token");
};
