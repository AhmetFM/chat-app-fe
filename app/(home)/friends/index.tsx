import React from "react";
import { ScrollView, Text, View } from "react-native";

const Friends = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <Text>Friends</Text>
      </ScrollView>
    </View>
  );
};

export default Friends;
