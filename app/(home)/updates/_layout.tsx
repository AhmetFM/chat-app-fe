import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

const UpdatesLayout = () => {
  const colorScheme = useColorScheme();
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
            <TouchableOpacity className="bg-gray-200 dark:bg-zinc-800 p-1 rounded-full">
              <Ionicons
                className="fill-white"
                name="ellipsis-horizontal"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
          },
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#f5f5f5" : "#000",
          },
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerShown: false,
          animation: "none",
        }}
      />
    </Stack>
  );
};

export default UpdatesLayout;
