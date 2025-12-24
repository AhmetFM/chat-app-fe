import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const SingleUpdate = ({ opened, id }: { opened: boolean; id: string }) => {
  /* const scale = useRef(new Animated.Value(1)).current;

  const openStory = (id: string) => {
    Animated.timing(scale, {
      toValue: 20,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      //router.push(`/(home)/updates/${id}`);
      scale.setValue(1);
    });
  }; */

  return (
    //<Link href={`/(home)/updates/${id}`} asChild>
    <TouchableOpacity
    //onPress={() => openStory(id)}
    >
      <View className="flex-row gap-4">
        <View
          className={`border-2 rounded-full p-[2px] ${opened ? "border-gray-400" : "border-green-700"} `}
        >
          <Animated.Image
            source={{
              uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
            }}
            width={60}
            height={60}
            className="rounded-full"
            /* style={{
              transform: [{ scale }],
            }} */
          />
        </View>
        <View className="mt-2">
          {/* My Status, Add to my status */}
          <Text className="text-xl font-medium dark:text-white">My Status</Text>
          <Text className="font-light text-gray-600">4h ago</Text>
        </View>
      </View>
    </TouchableOpacity>
    //</Link>
  );
};

export default SingleUpdate;
