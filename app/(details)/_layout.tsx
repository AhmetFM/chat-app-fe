import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function DetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "regular",
          //headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="py-2 px-1"
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row gap-4">
              <TouchableOpacity className=" p-1 rounded-full">
                <Ionicons name="videocam-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 rounded-full">
                <Ionicons name="call-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View className="flex-row w-[220px] items-center gap-[10px] pb-1">
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text className="text-[16px] font-medium">Ahmet Meric</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Stack>
  );
}
