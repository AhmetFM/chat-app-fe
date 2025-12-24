import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";

const ChatsLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
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
          headerRight: () => (
            <View className="flex-row gap-6">
              <TouchableOpacity className="bg-gray-200 p-1 rounded-full">
                <Ionicons name="camera" size={20} color="black" />
              </TouchableOpacity>
              <Link href="/(modals)/new-chat" asChild>
                <TouchableOpacity className="bg-green-400 p-1 rounded-full">
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          headerSearchBarOptions: {
            placeholder: "Search",
            placement: "automatic",
          },
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

export default ChatsLayout;
