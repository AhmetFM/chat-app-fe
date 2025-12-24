import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const FriendsLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Friends",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
          },
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
        }}
      />
    </Stack>
  );
};

export default FriendsLayout;
