import dummyChats from "@/assets/data/chats.json";
import SingleChatRow from "@/components/SingleChatRow";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Chats = () => {
  const separatorHeight = StyleSheet.hairlineWidth;

  const FILTERS = ["All", "Unread", "Favorites", "Groups", "+"];

  const [chats, setChats] = useState([1, 2, 3]);
  const [selectedFilter, setSelectedFilter] = useState(0);

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
        <ScrollView contentInsetAdjustmentBehavior="always">
          <View className="flex-row mx-4 gap-3">
            {FILTERS.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedFilter(index)}
                className={`px-4 py-2  border ${selectedFilter === index && "border-green-500 bg-green-200"} border-gray-300 rounded-3xl`}
              >
                <Text className="text-gray-600 text-base font-medium">
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
