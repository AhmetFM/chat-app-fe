import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const SettingsLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
          },
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#f5f5f5" : "#000",
          },
        }}
      />
      <Stack.Screen
        name="update-profile"
        options={{
          title: "Profile",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
          },
          headerTintColor: colorScheme === "dark" ? "white" : "dark",
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
