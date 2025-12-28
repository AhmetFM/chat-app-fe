import { useChatListSocket } from "@/hooks/useChatListSocket";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeLayout = () => {
  const colorScheme = useColorScheme();
  useChatListSocket();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1DAB61",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
            borderColor: colorScheme === "dark" ? "#27272a" : "#f5f5f5",
          },
        }}
      >
        <Tabs.Screen
          name="updates"
          options={{
            headerShown: false,
            title: "Updates",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="update" color={color} size={size} />
            ),
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
              borderColor: colorScheme === "dark" ? "#27272a" : "#f5f5f5",
            },
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            headerShown: false,
            title: "Friends",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="contact-book" size={size} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
              borderColor: colorScheme === "dark" ? "#27272a" : "#f5f5f5",
            },
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            headerShown: false,
            title: "Chats",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" color={color} size={size} />
            ),
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
              borderColor: colorScheme === "dark" ? "#27272a" : "#f5f5f5",
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
              borderColor: colorScheme === "dark" ? "#27272a" : "#f5f5f5",
            },
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;
