import contacts from "@/assets/data/contacts.json";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";
const NewChat = () => {
  const data = contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}-${index}`,
  }));
  const separatorHeight = StyleSheet.hairlineWidth;
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
          <View className="h-[30px] justify-center px-3 bg-[#f5f5f5]">
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
          <View className="flex-1 px-3 flex-row items-center gap-3 bg-white  h-[50px]">
            <Image
              source={{ uri: item.img }}
              className="w-10 h-10 rounded-3xl"
            />
            <View>
              <Text className="text-black text-sm">{item.value}</Text>
              <Text className="text-gray-400 text-xs">
                {item.desc.length > 40
                  ? `${item.desc.substring(0, 40)}...`
                  : `${item.desc}`}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default NewChat;
