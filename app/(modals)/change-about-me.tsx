import { AuthContext } from "@/context/AuthContext";
import { updateUser } from "@/services/user.service";
import { Stack, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const separatorHeight = StyleSheet.hairlineWidth;

const ChangeAboutMe = () => {
  const router = useRouter();
  const [aboutMe, setAboutMe] = useState<string>("");
  const { user, setUser } = useContext(AuthContext);

  const selectableTexts = [
    "Busy",
    "At school",
    "At the movies",
    "At work",
    "Battery about to die",
    "In a meeting",
    "At the gym",
    "Sleeping",
  ];

  const handleUpdateAbout = (aboutMe: string) => {
    setUser({ ...user!, aboutMe: aboutMe });
    updateUser({ aboutMe: aboutMe }).then(() => router.back());
  };

  useEffect(() => {
    setAboutMe(user?.aboutMe!);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] dark:bg-[#18181a]">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="dark:text-white">Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              className="disabled:opacity-25"
              disabled={aboutMe === user?.name || aboutMe.length == 0}
              onPress={() => handleUpdateAbout(aboutMe)}
            >
              <Text className="dark:text-white">Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1" contentInsetAdjustmentBehavior="always">
        <TextInput
          className=" mt-8 mx-6 bg-white dark:text-white dark:bg-[#27272a] px-4 py-3 rounded-xl"
          placeholder="About Me"
          onChangeText={(e) => setAboutMe(e)}
          value={aboutMe}
        />
        <Text className="text-gray-500 text-sm mx-6 px-4 mt-4">
          Change manually or select one from below
        </Text>
        <View className="bg-zinc-800 mt-8 mx-6 rounded-lg">
          <FlatList
            data={selectableTexts}
            scrollEnabled={false}
            keyExtractor={(props) => props}
            renderItem={(props) => {
              return (
                <TouchableOpacity
                  onPress={() => setAboutMe(props.item)}
                  className="px-4 py-4"
                >
                  <Text className="dark:text-white/75">{props.item}</Text>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: separatorHeight,
                  marginLeft: 14,
                }}
                className="bg-gray-300"
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeAboutMe;
