import ConfirmOrDeclineUser from "@/components/ConfirmOrDeclineUser";
import SingleFriendRow from "@/components/SingleFriendRow";
import SingleUserRow from "@/components/SingleUserRow";
import { useFriends } from "@/hooks/useFriends";
import { useFriendsSocket } from "@/hooks/useFriendsSocket";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const separatorHeight = StyleSheet.hairlineWidth;

const Friends = () => {
  const colorScheme = useColorScheme();
  const [query, setQuery] = useState<string>("");

  const {
    users,
    incomingRequests,
    outgoingRequests,
    friends,
    loading,
    setFriends,
    setIncomingRequests,
    setOutgoingRequests,
  } = useFriends(query);

  useFriendsSocket({ setFriends, setIncomingRequests, setOutgoingRequests });

  const usersWithFriendsStatus = users.map((user) => ({
    ...user,
    isPending:
      outgoingRequests.some((r) => r.receiverId === user.id) ||
      incomingRequests.some((r) => r.senderId === user.id),
    isFriends: friends.some((f) => f.id === user.id),
  }));

  if (loading) {
    return (
      <View className="flex-1 h-full dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
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
            data={incomingRequests}
            extraData={incomingRequests}
            renderItem={({ item }) => <ConfirmOrDeclineUser {...item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: separatorHeight,
                  marginLeft: 60,
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
            extraData={friends}
            renderItem={({ item }) => <SingleFriendRow {...item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: separatorHeight,
                  marginLeft: 60,
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
            data={usersWithFriendsStatus}
            renderItem={({ item }) => <SingleUserRow {...item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: separatorHeight,
                  marginLeft: 60,
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
