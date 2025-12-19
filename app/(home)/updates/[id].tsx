import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";

const SingleUpdateScreen = () => {
  return (
    <Pressable
      style={{ flex: 1, backgroundColor: "black" }}
      onPress={() => router.back()}
    >
      <Image
        source={{ uri: "https://avatars.githubusercontent.com/u/74562743?v=4" }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default SingleUpdateScreen;
