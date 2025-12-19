import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};

export default AuthLayout;
