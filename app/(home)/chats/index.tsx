import dummyChats from "@/assets/data/chats.json";
import SingleChatRow from "@/components/SingleChatRow";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const Chats = () => {
  const separatorHeight = StyleSheet.hairlineWidth;

  const [chats, setChats] = useState([1, 2, 3]);
  //TODO:Fetch user chats and display them

  return (
    <View className="flex-1 dark:bg-black">
      {chats.length <= 0 ? (
        <View className="flex-1 dark:bg-black flex items-center justify-center">
          <Text className="dark:text-white">
            Start conversations with pressing plus button
          </Text>
        </View>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" className="">
          <FlatList
            data={dummyChats}
            renderItem={({ item }) => <SingleChatRow {...item} />}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: separatorHeight,
                  marginLeft: 82,
                }}
                className="bg-gray-300"
              />
            )}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Chats;
