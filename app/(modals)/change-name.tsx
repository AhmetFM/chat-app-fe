import { AuthContext } from "@/context/AuthContext";
import { updateUser } from "@/services/user.service";
import { Stack, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeName = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setName(user.name);
  }, []);

  const handleUpdateName = async (name: string) => {
    setUser({ ...user, name: name });
    updateUser({ name: name }).then(() => router.back());
  };

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
              disabled={name === user.name || name.length == 0}
              onPress={() => handleUpdateName(name)}
              className="disabled:opacity-25"
            >
              <Text className="dark:text-white">Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1" contentInsetAdjustmentBehavior="always">
        <TextInput
          className=" mt-8 mx-6 bg-white dark:text-white dark:bg-[#27272a] px-4 py-3 rounded-xl"
          placeholder="Name"
          onChangeText={(e) => setName(e)}
          value={name}
        />
        <Text className="text-gray-500 text-sm mx-6 px-4 mt-4">
          This name appears if you are not registered in the contacts of users
          you interact with.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeName;
