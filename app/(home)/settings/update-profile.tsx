import { AuthContext } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handlePress = () => {
    router.push("/(settings)/update-picture");
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      className="flex-1 h-full bg-[#f5f5f5] dark:bg-black"
    >
      <View className="items-center relative ">
        <TouchableOpacity onPress={handlePress}>
          <View
            className=" border-[#ddd] dark:border-[#18181b]"
            style={{
              borderWidth: 1,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              width: 140,
              height: 140,
            }}
          >
            {user.profileImage ? (
              <Image
                source={{
                  uri: user.profileImage,
                }}
                className="w-40 h-40"
              />
            ) : (
              <View className="w-[140px] h-[140px] rounded-full items-center justify-center bg-gray-500">
                <FontAwesome name="user" size={80} color="white" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Button title="Edit" color={"green"} />
      </View>
      <View className="m-5 gap-6">
        {/* About Me */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">About Me</Text>
          <View className="bg-white dark:bg-[#18181b] py-[14px] px-4 rounded-xl flex-row items-center justify-between">
            <Text className="dark:text-white">{user.aboutMe}</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </View>
        </View>
        {/* Name */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Name</Text>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/change-name")}
            className="bg-white dark:bg-[#18181b] py-[14px] px-4 rounded-xl flex-row items-center justify-between"
          >
            <Text className="dark:text-white">{user.name}</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </TouchableOpacity>
        </View>
        {/* Email */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Email</Text>
          <View className="bg-white dark:bg-[#18181b] py-[14px] px-4 rounded-xl flex-row items-center justify-between">
            <Text className="dark:text-white">afm634@gmail.com</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={"gray"} />
          </View>
        </View>
        {/* Links */}
        <View className="gap-3">
          <Text className="text-gray-600 ml-4">Link</Text>
          <View className="bg-white dark:bg-[#18181b] py-[14px] px-4 rounded-xl flex-row items-center justify-between">
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
