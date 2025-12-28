import { AuthContext } from "@/context/AuthContext";
import { login } from "@/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { setUserToken } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEmailPasswordSignIn = async () => {
    //Checking if email is valid using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const result = await login({ email, password });
      await AsyncStorage.setItem("token", result.refreshToken);
      setUserToken(result.accessToken);
      router.replace("/");
    } catch (e) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !email.trim() || !password.trim();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-6 px-6 dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="w-full h-full justify-center max-w-md"
      >
        <Text className="text-3xl font-bold text-black dark:text-white text-center">
          Sign in
        </Text>
        <Text className="mt-2 text-center text-gray-600 dark:text-gray-300">
          Use your email and password to continue.
        </Text>

        {error ? (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        ) : null}

        <View className="mt-8 gap-4">
          <TextInput
            className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-black dark:text-white"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-black dark:text-white"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          className={`mt-6 rounded-2xl py-4 ${
            isDisabled
              ? "bg-green-400/40 dark:bg-green-800/40"
              : "bg-green-500 dark:bg-green-700"
          }`}
          disabled={isDisabled}
          activeOpacity={0.9}
          onPress={handleEmailPasswordSignIn}
        >
          <Text className="text-center text-white text-lg font-semibold">
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>

        <View className="mt-4 flex-row justify-center gap-2">
          <Text className="text-gray-600 dark:text-gray-300">
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
            <Text className="text-green-600 dark:text-green-400 font-semibold">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
