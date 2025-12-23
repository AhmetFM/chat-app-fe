import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("screen").width;

const UpdatePicture = () => {
  const [isReady, setIsReady] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
    <GestureHandlerRootView className="flex-1 h-full bg-[#f5f5f5] items-center justify-center mt-50">
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleExpandPress}>
              <Ionicons name="pencil" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Image
        source={{
          uri: "https://ahmetmeric.vercel.app/images/profile-picture.jpg",
        }}
        width={screenWidth}
        height={screenWidth}
      />
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
          <View className=" bg-[#f5f5f5] w-full flex-row items-center justify-between pt-5 px-5 ">
            <Text className="flex-1 text-lg text-center font-medium pl-7 ">
              Edit Profile Picture
            </Text>
            <TouchableOpacity onPress={handleClosePress}>
              <Ionicons
                className="p-1 bg-gray-200 rounded-full"
                name="close"
                color={"gray"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        )}
        ref={bottomSheetRef}
        index={-1}
      >
        <BottomSheetView className="flex-1 p-5 bg-[#f5f5f5] gap-4 pb-16">
          <View className="bg-white rounded-xl">
            <View className="flex-row items-center justify-between p-5">
              <Text>Take a photo</Text>
              <Ionicons name="camera-outline" size={24} />
            </View>
            <View className="flex-row items-center justify-between p-5">
              <Text>Choose a photo</Text>
              <FontAwesome name="photo" size={24} color="black" />
            </View>
          </View>
          <View className="bg-white rounded-xl">
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
