import React, { useContext } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";

import { AuthContext } from "@/context/AuthContext";
import { Chat } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import { Link } from "expo-router";

const SingleChatRow = ({
  id,
  userA,
  userB,
  lastMessage,
  lastMessageAt,
  unreadCount,
}: Chat) => {
  const { user } = useContext(AuthContext);
  const otherUser = userA.id === user?.id ? userB : userA;

  return (
    <Link href={`/(details)/${id}`} asChild>
      <TouchableHighlight
        activeOpacity={0.6}
        //underlayColor="#f0f0f0"
      >
        <View className="w-full h-20 flex-row items-center gap-[14px] pl-5 py-[10px]">
          {/* Profile Img */}
          {otherUser.profileImage ? (
            <Image
              className="w-[50px] h-[50px] rounded-full"
              source={{ uri: otherUser.profileImage }}
            />
          ) : (
            <View className="w-[50px] h-[50px] rounded-full items-center justify-center bg-gray-500">
              <FontAwesome name="user" size={24} color="white" />
            </View>
          )}

          <View className="flex-1">
            {/* Title, lastMessage and date. */}
            <Text className="text-lrg font-bold dark:text-white">
              {otherUser.name}
            </Text>
            <Text className="text-base text-gray-500">
              {lastMessage
                ? lastMessage.length > 40
                  ? `${lastMessage.substring(0, 40)}...`
                  : lastMessage
                : otherUser.aboutMe.length > 40
                  ? otherUser.aboutMe.slice(0, 40) + "..."
                  : otherUser.aboutMe}
            </Text>
          </View>
          <View className="gap-2">
            <Text
              className={`text-gray-500 pr-5 items-start ${unreadCount !== 0 && unreadCount !== undefined && "text-green-600"} `}
            >
              {format(lastMessageAt, "kk:mm")}
            </Text>
            {unreadCount! >= 1 && (
              <Text className="w-[18px] h-[18px] rounded-full self-end mr-4 text-sm text-center font-semibold  text-white bg-green-600">
                {unreadCount}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Link>
  );
};

export default SingleChatRow;
