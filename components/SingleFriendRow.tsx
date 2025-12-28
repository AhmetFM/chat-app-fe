import { User } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const SingleFriendRow = (user: User) => {
  if (!user)
    return (
      <View className="py-3">
        <Text className="dark:text-white">Loading User</Text>
      </View>
    );

  return (
    <View className="flex-row items-center gap-3 py-3">
      {user.profileImage ? (
        <Image
          source={{ uri: user.profileImage }}
          className="w-[36px] h-[36px] rounded-full"
        />
      ) : (
        <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-gray-500">
          <FontAwesome name="user" size={24} color="white" />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-lg font-medium dark:text-white">{user.name}</Text>
        <Text className="text-gray-500">
          {user.aboutMe?.length >= 40
            ? user.aboutMe.slice(0, 24) + "..."
            : user.aboutMe}
        </Text>
      </View>
    </View>
  );
};

export default SingleFriendRow;
