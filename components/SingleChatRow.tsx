import { format } from "date-fns";
import React from "react";
import { Image, Text, View } from "react-native";

import noProfileImage from "@/assets/images/no-profile-image.svg";

const no_profile_image = Image.resolveAssetSource(noProfileImage).uri;

export interface SingleChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const SingleChatRow = ({
  id,
  from,
  date,
  img,
  msg,
  read,
  unreadCount,
}: SingleChatRowProps) => {
  return (
    <View className="w-full h-20 flex-row items-center gap-[14px] pl-5 py-[10px]">
      {/* Profile Img */}
      <Image
        className="w-[50px] h-[50px] rounded-full"
        source={{ uri: img ? img : no_profile_image }}
      />

      <View className="flex-1">
        {/* Title, lastMessage and date. */}
        <Text className="text-lg font-bold">{from}</Text>
        <Text className="text-base text-gray-500">
          {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
        </Text>
      </View>
      <View className="gap-2">
        <Text
          className={`text-gray-500 pr-5 items-start ${unreadCount && "text-green-600"} `}
        >
          {format(date, "MM.dd.yy")}
        </Text>
        {unreadCount >= 1 && (
          <Text className="w-[18px] h-[18px] rounded-full self-end mr-4 text-center font-semibold  text-white bg-green-600">
            {unreadCount}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SingleChatRow;
