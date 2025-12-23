import { Stack } from "expo-router";
import React from "react";

const SettingsLayout = () => {
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
            backgroundColor: "#f5f5f5",
          },
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
