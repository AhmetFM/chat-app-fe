import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const UpdatesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Updates",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerLeft: ({}) => (
            <TouchableOpacity className="bg-gray-200 p-1 rounded-full">
              <Ionicons
                className="fill-white"
                name="ellipsis-horizontal"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          ),
          /* headerSearchBarOptions: {
            placeholder: "Search",
          }, */
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default UpdatesLayout;
