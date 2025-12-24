import ConfirmOrDeclineUser from "@/components/ConfirmOrDeclineUser";
import SingleFriendRow from "@/components/SingleFriendRow";
import SingleUserRow from "@/components/SingleUserRow";
import { useFriends } from "@/hooks/useFriends";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const separatorHeight = StyleSheet.hairlineWidth;

const Friends = () => {
  const [query, setQuery] = useState<string>("");
  const { users, requests, friends, loading, refresh } = useFriends(query);

  const colorScheme = useColorScheme();

  if (loading) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
      }}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (event) => {
              setQuery(event.nativeEvent.text);
            },
          },
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className="mx-5 mt-3 gap-8">
          <Text className="text-xl font-medium dark:text-white">
            Friend requests
          </Text>
        </View>
        <View className="mx-5 my-4 gap-5">
          <FlatList
            data={requests}
            renderItem={({ item }) => <ConfirmOrDeclineUser {...item} />}
            keyExtractor={(item) => item.id}
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
        </View>
        <View className="mx-5 mt-3 gap-8">
          <Text className="text-xl font-medium dark:text-white">Friends</Text>
        </View>
        <View className="mx-5 my-4 gap-5">
          <FlatList
            data={friends}
            renderItem={({ item }) => <SingleFriendRow {...item} />}
            keyExtractor={(item) => item.id}
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
        </View>
        {/* ADD NEW FRIENDS */}
        <View className="mx-5 mt-3 gap-8">
          <Text className="text-xl font-medium dark:text-white">
            Add New Friends
          </Text>
        </View>
        <View className="mx-5 my-4 gap-5">
          <FlatList
            data={users}
            onRefresh={refresh}
            refreshing={loading}
            renderItem={({ item }) => (
              <SingleUserRow onActionSuccess={refresh} {...item} />
            )}
            keyExtractor={(item) => item.id}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Friends;
