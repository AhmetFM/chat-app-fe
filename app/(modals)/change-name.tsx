import { Stack, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeName = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1" contentInsetAdjustmentBehavior="always">
        <TextInput
          className=" mt-8 mx-6 bg-white px-4 py-3 rounded-xl"
          placeholder="Name"
          value="Ahmet"
        />
        <Text className="text-gray-500 text-sm mx-6 px-4 mt-4">
          This name appears if you are not registered in the contacts of users
          you interact with.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeName;
