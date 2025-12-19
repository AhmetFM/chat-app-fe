import { Stack } from "expo-router";
import React from "react";

const FriendsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Friends",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerSearchBarOptions: {
            placeholder: "Search",
          },
        }}
      />
    </Stack>
  );
};

export default FriendsLayout;
