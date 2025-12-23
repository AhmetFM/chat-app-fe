import { useFriends } from "@/hooks/useFriends";
import { createOrGetConversation } from "@/services/conversation.service";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";

const separatorHeight = StyleSheet.hairlineWidth;

const NewChat = () => {
  const { friends, loading } = useFriends();

  const data = friends.map((contact, index) => ({
    value: `${contact.name}`,
    name: `${contact.name}`,
    img: contact.profileImage,
    desc: contact.aboutMe,
    key: `${contact.id}`,
  }));

  const handleCreateChat = async (id: string) => {
    const result = await createOrGetConversation(id);
    console.log(result.id);
  };

  if (loading) return null;
  return (
    <View className="flex-1 pt-32 bg-[#f5f5f5]">
      <AlphabetList
        data={data}
        stickySectionHeadersEnabled
        indexLetterStyle={{
          color: "green",
          fontSize: 12,
        }}
        indexContainerStyle={{
          width: 24,
          backgroundColor: "#f5f5f5",
        }}
        style={{
          marginLeft: 16,
        }}
        renderCustomSectionHeader={(section) => (
          <View className="h-[30px] justify-center px-3 #f5f5f5]">
            <Text>{section.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: separatorHeight,
              marginLeft: 60,
            }}
            className="bg-gray-200"
          />
        )}
        renderCustomItem={(item: any) => (
          <TouchableOpacity onPress={() => handleCreateChat(item.key)}>
            <View className="flex-1 px-3 flex-row items-center gap-3 bg-white  h-[50px]">
              {item.img ? (
                <Image
                  source={{ uri: item.img }}
                  className="w-10 h-10 rounded-3xl"
                />
              ) : (
                <View className="w-10 h-10 rounded-full items-center justify-center bg-gray-500">
                  <FontAwesome name="user" size={18} color="white" />
                </View>
              )}

              <View>
                <Text className="text-black text-sm">{item.name}</Text>
                <Text className="text-gray-400 text-xs">
                  {item.desc.length > 40
                    ? `${item.desc.substring(0, 40)}...`
                    : `${item.desc}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewChat;
