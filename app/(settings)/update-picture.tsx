import { AuthContext } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;

const UpdatePicture = () => {
  const [isReady, setIsReady] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user } = useContext(AuthContext);

  const colorScheme = useColorScheme();

  //TODO: Add ImagePicker and FileSystem and select Profile Picture and save locally and supabase storage.

  useEffect(() => {
    bottomSheetRef.current?.expand();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  const handleExpandPress = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <GestureHandlerRootView className="flex-1 h-full bg-[#f5f5f5] dark:bg-black items-center justify-center mt-50">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
          },
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerRight: () => (
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center"
              onPress={handleExpandPress}
            >
              <Ionicons
                name="pencil"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {user?.profileImage ? (
        <Image
          source={{
            uri: "https://ahmetmeric.vercel.app/images/profile-picture.jpg",
          }}
          width={screenWidth}
          height={screenWidth}
        />
      ) : (
        <View
          style={{
            width: screenWidth,
            height: screenWidth,
          }}
          className="items-center justify-center bg-gray-500"
        >
          <FontAwesome name="user" size={100} color="white" />
        </View>
      )}

      <BottomSheet
        snapPoints={["35%"]}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
          />
        )}
        handleComponent={() => (
          <View className=" bg-[#f5f5f5] dark:bg-zinc-900 w-full flex-row items-center justify-between pt-5 px-5 ">
            <Text className="flex-1 text-lg text-center font-medium pl-7 dark:text-white ">
              Edit Profile Picture
            </Text>
            <TouchableOpacity onPress={handleClosePress}>
              <Ionicons
                className="p-1 bg-gray-200 dark:bg-zinc-800 rounded-full"
                name="close"
                color={colorScheme === "dark" ? "white" : "gray"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        )}
        ref={bottomSheetRef}
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "#18181b" : "#f5f5f5",
        }}
        index={-1}
      >
        <BottomSheetView className="flex-1 p-5 bg-[#f5f5f5] dark:bg-zinc-900 gap-4 pb-16">
          <View className="bg-white dark:bg-zinc-800 rounded-xl">
            <View className="flex-row items-center justify-between p-5">
              <Text className="dark:text-white">Take a photo</Text>
              <Ionicons
                name="camera-outline"
                color={colorScheme === "dark" ? "white" : "black"}
                size={24}
              />
            </View>
            <View className="flex-row items-center justify-between p-5">
              <Text className="dark:text-white">Choose a photo</Text>
              <FontAwesome
                name="photo"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </View>
          </View>
          <View className="bg-white dark:bg-zinc-800 rounded-xl">
            <View className="flex-row items-center justify-between p-5">
              <Text className="text-red-500">Remove photo</Text>
              <Ionicons name="trash-outline" size={24} color={"red"} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default UpdatePicture;
