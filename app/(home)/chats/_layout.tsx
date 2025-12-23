import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const ChatsLayout = () => {
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
            <TouchableOpacity className="bg-gray-200 p-1 rounded-full">
              <Ionicons
                className="fill-white"
                name="ellipsis-horizontal"
                size={20}
                color="black"
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
          },
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Stack>
  );
};

export default ChatsLayout;
