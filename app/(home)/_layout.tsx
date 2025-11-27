import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="updates" />
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default HomeLayout;
