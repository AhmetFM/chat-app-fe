import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SingleUpdate = ({ opened, id }: { opened: boolean; id: string }) => {
  return (
    <Link href={`/(home)/updates/${id}`} asChild>
      <TouchableOpacity>
        <View className="flex-row gap-4">
          <View
            className={`border-2 rounded-full p-[2px] ${opened ? "border-gray-400" : "border-green-700"} `}
          >
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
              }}
              width={60}
              height={60}
              className="rounded-full"
            />
          </View>
          <View className="mt-2">
            {/* My Status, Add to my status */}
            <Text className="text-xl font-medium">My Status</Text>
            <Text className="font-light text-gray-600">4h ago</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SingleUpdate;
