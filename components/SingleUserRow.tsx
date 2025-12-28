import { AuthContext } from "@/context/AuthContext";
import { sendFriendRequest } from "@/services/friends.service";
import { User } from "@/types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SingleUserRow = ({
  id,
  name,
  email,
  profileImage,
  aboutMe,
  receivedFriendRequests,
  sentFriendRequests,
  isFriends,
  isPending,
}: User & { isPending: boolean; isFriends: boolean }) => {
  const { user } = useContext(AuthContext);

  const handleAddFriend = async () => {
    await sendFriendRequest(id);
  };

  if (!id || isFriends) {
    return null;
  }

  /*  const isPending =
    sentFriendRequests?.some(
      (res) => res.status === "PENDING" && res.receiverId === user?.id
    ) ||
    receivedFriendRequests?.some(
      (req) => req.status === "PENDING" && req.senderId === user?.id
    ); */

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
      <TouchableOpacity
        disabled={isPending}
        onPress={handleAddFriend}
        className="disabled:opacity-50 p-2 rounded-full flex-row items-center justify-center gap-1 bg-[#1DAB61]"
      >
        <Ionicons name="person-add-outline" size={24} color={"white"} />
        <Text className="items-center justify-center text-white font-semibold">
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleUserRow;
