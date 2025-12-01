import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "regular",
          //headerTransparent: true,
          headerRight: () => (
            <View className="flex-row gap-4">
              <TouchableOpacity className=" p-1 rounded-full">
                <Ionicons name="videocam-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 rounded-full">
                <Ionicons name="call-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View className="flex-row w-[220px] items-center gap-[10px] pb-1">
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text className="text-[16px] font-medium">Ahmet Meric</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Stack>
  );
};

export default ChatsLayout;
