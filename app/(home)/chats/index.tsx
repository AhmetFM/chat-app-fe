import SingleChatRow from "@/components/SingleChatRow";
import useChats from "@/hooks/useChats";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const separatorHeight = StyleSheet.hairlineWidth;

const Chats = () => {
  const FILTERS = ["All", "Unread", "Favorites", "Groups", "+"];

  const [selectedFilter, setSelectedFilter] = useState(0);

  const { chats, loading } = useChats();

  if (loading) return null;

  return (
    <View className="flex-1 dark:bg-black">
      {chats === 0 ? (
        <View className="flex-1 bg-[#f5f5f5] dark:bg-black flex items-center justify-center">
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
                className={`px-4 py-2  border ${selectedFilter === index && "border-green-500 bg-green-200 dark:border-green-800 dark:bg-green-700"} border-gray-300 dark:border-gray-800 rounded-3xl`}
              >
                <Text className="text-gray-600 dark:text-gray-100 text-base font-medium">
                  {filter}
                  {/*  */}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <FlatList
            data={chats}
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
