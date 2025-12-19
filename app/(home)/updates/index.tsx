import AddMyStatus from "@/components/AddMyStatus";
import SingleUpdate from "@/components/SingleUpdate";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Updates = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="mx-5 my-3 gap-8">
          <Text className="text-xl font-medium">Status</Text>
          <AddMyStatus />
        </View>
        <View className="mx-5 my-4 gap-5">
          <Text className="text-gray-600 text-lg">Recent Updates</Text>
          <SingleUpdate opened={false} id={"1"} />
          <SingleUpdate opened={true} id={"2"} />
        </View>
        <View className="mx-5 my-4 gap-4">
          <Text className="text-xl font-medium">Channels</Text>
          <Text className="text-gray-500">
            Stay updated on topics that matter to you. Find Channels to follow
            below.
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg text-gray-700 font-medium">
              Find channels to follow
            </Text>
            <Entypo name="chevron-down" size={16} color="grey" />
          </View>
          <TouchableOpacity className="bg-[#1DAB61] px-3 py-1 rounded-3xl w-[120px]">
            <Text className="text-lg text-white font-medium">Explore more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Updates;
