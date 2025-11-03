import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../../assets/images/chatter-logo.png");

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1 items-center">
      <Image className=" w-2/3 h-3/5" source={logo} />
      <Text className="text-4xl font-bold w-1/2 text-center mb-8">
        Welcome to Chatter
      </Text>
      <Text className="text-lg font-medium text-gray-600">
        Start chatting with your friends
      </Text>
      <Text className="text-lg font-medium text-gray-600">
        Sign in to get started
      </Text>
      <TouchableOpacity className="bg-blue-500 w-1/2 mt-6 rounded-2xl">
        <Text className="text-white font-semibold px-12 py-6 rounded-2xl text-center">
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;
