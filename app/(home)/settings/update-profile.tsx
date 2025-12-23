import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UpdateProfile = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(settings)/update-picture");
  };

  return (
    <ScrollView className="flex-1 h-full mt-32 bg-[#f5f5f5]">
      <View className="items-center relative">
        <TouchableOpacity onPress={handlePress}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              width: 140,
              height: 140,
            }}
          >
            <Image
              source={{
                uri: "https://ahmetmeric.vercel.app/images/profile-picture.jpg",
              }}
              className="w-40 h-40"
            />
          </View>
        </TouchableOpacity>
        <Button title="Edit" color={"green"} />
      </View>
      <View className="m-5 gap-6">
        {/* About Me */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">About Me</Text>
          <View className="bg-white py-[14px] px-4 rounded-xl flex-row items-center justify-between">
            <Text>Et tu brute</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </View>
        </View>
        {/* Name */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Name</Text>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/change-name")}
            className="bg-white py-[14px] px-4 rounded-xl flex-row items-center justify-between"
          >
            <Text>Ahmet</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </TouchableOpacity>
        </View>
        {/* Email */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Name</Text>
          <View className="bg-white py-[14px] px-4 rounded-xl flex-row items-center justify-between">
            <Text>afm634@gmail.com</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </View>
        </View>
        {/* Links */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Link</Text>
          <View className="bg-white py-[14px] px-4 rounded-xl flex-row items-center justify-between">
            <Text className="text-[#1DAB61]">Add Link</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={"green"}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
