import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  /* const { userToken } = useContext(AuthContext);
  if (userToken) {
    router.replace("/(home)");
  } */

  return (
    <SafeAreaView className="flex-1 items-center justify-between dark:bg-black">
      <View className="w-full items-center px-6 mt-20">
        <Text className="text-4xl font-bold text-black dark:text-white text-center">
          Welcome to Chat App
        </Text>
        <Text className="mt-4 text-center text-gray-600 dark:text-gray-300">
          There is no email sign-in. Continue with your phone number like
          WhatsApp.
        </Text>
      </View>

      <View className="w-full px-6 mb-10">
        <TouchableOpacity
          className="rounded-2xl bg-green-500 dark:bg-green-700 py-4"
          activeOpacity={0.9}
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Agree & Continue
          </Text>
        </TouchableOpacity>
        <Text className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to the Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
