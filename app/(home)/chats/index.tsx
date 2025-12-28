import SingleChatRow from "@/components/SingleChatRow";
import { useChatContext } from "@/context/ChatsContext";
import useChats from "@/hooks/useChats";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const separatorHeight = StyleSheet.hairlineWidth;

const Chats = () => {
  const FILTERS = ["All", "Unread", "Favorites", "Groups", "+"];
  const colorScheme = useColorScheme();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const { loading } = useChats();

  const { chats } = useChatContext();

  if (loading)
    return (
      <View className="flex-1 h-full dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View className="flex-1 dark:bg-black">
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View className="flex-row mx-4 gap-3">
          {chats?.length! > 0 &&
            FILTERS.map((filter, index) => (
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
          ListEmptyComponent={() => (
            <View className="flex-1 mt-32 bg-[#f5f5f5] dark:bg-black flex items-center justify-center gap-4">
              <View>
                <FontAwesome
                  name="wechat"
                  size={120}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </View>
              <Text className="dark:text-white text-2xl font-medium text-center">
                Start chatting
              </Text>

              <Text className="dark:text-white">
                Add your friends to start chatting with them
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Chats;
