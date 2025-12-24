import { respondFriendRequest } from "@/services/friends.service";
import { FriendRequest, RespondFriendRequestEnum } from "@/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ConfirmOrDeclineUser = ({ id, sender }: FriendRequest) => {
  const handleConfirmOrDecline = (respond: RespondFriendRequestEnum) => {
    respondFriendRequest(id, respond);
  };

  return (
    <View className="flex-row items-center gap-3 py-3">
      {sender.profileImage ? (
        <Image
          source={{ uri: sender.profileImage }}
          className="w-[36px] h-[36px] rounded-full"
        />
      ) : (
        <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-gray-500">
          <FontAwesome name="user" size={24} color="white" />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-lg font-medium dark:text-white">
          {sender.name}
        </Text>
        <Text className="text-gray-500">
          {sender.aboutMe.length >= 40
            ? sender.aboutMe.slice(0, 24) + "..."
            : sender.aboutMe}
        </Text>
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() =>
            handleConfirmOrDecline(RespondFriendRequestEnum.ACCEPT)
          }
          className="p-2 rounded-full bg-[#1DAB61]"
        >
          <Text className="text-lg text-white font-semibold">
            <Ionicons name="checkmark-outline" size={24} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleConfirmOrDecline(RespondFriendRequestEnum.REJECT)
          }
          className="p-2 rounded-full bg-[#FF6347]"
        >
          <Text className="text-lg text-white font-semibold">
            <Ionicons name="close-outline" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmOrDeclineUser;
