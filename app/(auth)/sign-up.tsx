import { AuthContext } from "@/context/AuthContext";
import { saveToken } from "@/utils/storage";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const { setUserToken } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEmailPasswordSignUp = async () => {
    setError("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !username.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      // TODO: Replace with real API call
      const response = await fetch("http://192.168.68.101:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name: username }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        return;
      }
      await saveToken(result.refreshToken);
      setUserToken(result.accessToken);

      router.replace("/");
    } catch (e) {
      setError("Failed to sign up. Please try again.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || !email.trim() || !password.trim() || !confirmPassword.trim();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-6 px-6 dark:bg-black">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-black dark:text-white text-center">
          Create account
        </Text>
        <Text className="mt-2 text-center text-gray-600 dark:text-gray-300">
          Sign up with your email and password.
        </Text>

        {error ? (
          <Text className="mt-4 text-center text-red-500">{error}</Text>
        ) : null}

        <View className="mt-8 gap-4">
          <TextInput
            className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-black dark:text-white"
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={username}
            onChangeText={setUsername}
          />
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
          <TextInput
            className="rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-black dark:text-white"
            placeholder="Confirm password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
          onPress={handleEmailPasswordSignUp}
        >
          <Text className="text-center text-white text-lg font-semibold">
            {loading ? "Creating account..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        <View className="mt-4 flex-row justify-center gap-2">
          <Text className="text-gray-600 dark:text-gray-300">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
            <Text className="text-green-600 dark:text-green-400 font-semibold">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
