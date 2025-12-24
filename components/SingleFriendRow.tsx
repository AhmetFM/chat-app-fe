import { User } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const SingleFriendRow = ({ profileImage, name, aboutMe }: User) => {
  return (
    <View className="flex-row items-center gap-3 py-3">
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          className="w-[36px] h-[36px] rounded-full"
        />
      ) : (
        <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-gray-500">
          <FontAwesome name="user" size={24} color="white" />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-lg font-medium dark:text-white">{name}</Text>
        <Text className="text-gray-500">
          {aboutMe.length >= 40 ? aboutMe.slice(0, 24) + "..." : aboutMe}
        </Text>
      </View>
    </View>
  );
};

export default SingleFriendRow;
