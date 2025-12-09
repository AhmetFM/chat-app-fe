import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const AddMyStatus = () => {
  return (
    <View className="flex-row gap-4">
      <View className="relative">
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
          }}
          width={60}
          height={60}
          className="rounded-full"
        />
        <Entypo
          name="plus"
          className="absolute bg-[#1DAB61] rounded-full left-12 bottom-0"
          size={22}
          color={"white"}
        />
      </View>
      <View className="mt-2">
        {/* My Status, Add to my status */}
        <Text className="text-xl font-medium">My Status</Text>
        <Text className="font-light text-gray-600">My Status</Text>
      </View>
      <View className="flex-row flex-1 items-center justify-end">
        {/* Buttons */}
        <View className="flex-row gap-6">
          <View className="bg-gray-200 p-2 rounded-full">
            <MaterialCommunityIcons
              name="camera-plus"
              size={24}
              color="black"
            />
          </View>
          <View className="bg-gray-200 p-2 rounded-full">
            <Ionicons name="pencil" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddMyStatus;
