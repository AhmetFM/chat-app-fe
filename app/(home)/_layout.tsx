import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1DAB61",
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
              backgroundColor: "#f5f5f5",
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
              backgroundColor: "#f5f5f5",
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
              backgroundColor: "#f5f5f5",
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
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;
