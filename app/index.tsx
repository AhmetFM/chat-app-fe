import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { userToken } = useContext(AuthContext);

  if (!userToken) {
    return <Redirect href={"/(auth)/welcome"} />;
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center dark:bg-black">
      <Text className="text-4xl font-bold text-black dark:text-white">
        Hello
      </Text>
    </SafeAreaView>
  );
}
