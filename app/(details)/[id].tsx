import { useActiveChat } from "@/context/ActiveChatContext";
import { useChatContext } from "@/context/ChatsContext";
import useChat from "@/hooks/useChat";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chat = () => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id: conversationId } = useLocalSearchParams();
  const { setActiveChatId } = useActiveChat();
  const [text, setText] = useState("");

  const { messages, sendMessage, user, otherUser } = useChat(
    conversationId as string
  );
  const { setChats } = useChatContext();

  // If you have a tab bar, include its height
  const tabbarHeight = 50;
  const keyboardTopToolbarHeight = Platform.select({ ios: 16, default: 0 });
  const keyboardVerticalOffset =
    insets.bottom + tabbarHeight + keyboardTopToolbarHeight;

  useEffect(() => {
    setActiveChatId(conversationId as string);
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === conversationId ? { ...chat, unreadCount: 0 } : chat
      )
    );

    return () => setActiveChatId(null);
  }, [conversationId]);

  if (!user) return null;

  return (
    <View className="flex-1 bg-[#f5f5f5] dark:bg-[#373737]">
      <Stack.Screen
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerBlurEffect: "regular",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="py-2 px-1"
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row gap-4">
              <TouchableOpacity className=" p-1 rounded-full">
                <Ionicons
                  name="videocam-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity className="p-1 rounded-full">
                <Ionicons
                  name="call-outline"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View className="flex-row w-[220px] items-center gap-[10px] pb-1">
              {otherUser?.profileImage ? (
                <Image
                  source={{
                    uri: otherUser?.profileImage,
                  }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              ) : (
                <View className="w-[40px] h-[40px] rounded-full items-center justify-center bg-gray-500">
                  <FontAwesome name="user" size={24} color="white" />
                </View>
              )}

              <Text className="text-[16px] font-medium dark:text-white">
                {otherUser?.name}
              </Text>
            </View>
          ),
        }}
      />
      {/* TODO: Change links to png file */}
      <ImageBackground
        source={{
          uri:
            colorScheme === "dark"
              ? "https://i.redd.it/ts7vuoswhwf41.jpg"
              : "https://i.redd.it/qwd83nc4xxf41.jpg",
        }}
        style={{
          flex: 1,
          marginBottom: insets.bottom,
          backgroundColor: colorScheme === "dark" ? "black" : "#f5f5f5",
        }}
      >
        <GiftedChat
          messages={messages}
          onSend={sendMessage}
          user={{ _id: user.id }}
          colorScheme={colorScheme === "dark" ? "dark" : "light"}
          renderSystemMessage={(props) => (
            <SystemMessage
              containerStyle={{
                backgroundColor: "none",
                borderWidth: 0,
                alignItems: "center",
              }}
              {...props}
            />
          )}
          renderBubble={(props) => (
            <Bubble
              {...props}
              textStyle={{
                left: {
                  color: colorScheme === "dark" ? "white" : "#000",
                },
                right: {
                  color: colorScheme === "dark" ? "white" : "#000",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: colorScheme === "dark" ? "#232626" : "#fff",
                },
                right: {
                  backgroundColor:
                    colorScheme === "dark" ? "#154c37" : "#d0fecf",
                },
              }}
            />
          )}
          timeTextStyle={{
            left: {
              color: "grey",
            },
            right: {
              color: "grey",
            },
          }}
          renderSend={(props) => (
            <View
              style={{
                flexDirection: "row",
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                //paddingHorizontal: 14,
              }}
            >
              {text.length > 0 && (
                <Send
                  containerStyle={{
                    justifyContent: "center",
                  }}
                  {...props}
                >
                  <Ionicons
                    name="send"
                    size={28}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </Send>
              )}
              {text.length === 0 && (
                <>
                  <Ionicons
                    name="camera-outline"
                    size={28}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                  <Ionicons
                    name="mic-outline"
                    size={28}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </>
              )}
            </View>
          )}
          maxComposerHeight={100}
          textInputProps={{
            onChangeText: setText,
            style: {
              backgroundColor: colorScheme === "dark" ? "#4b4b4b" : "white",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#4b4b4b" : "#e5e5e5",
              paddingHorizontal: 10,
              fontSize: 16,
              paddingTop: 4,
              marginBottom: 4,
            },
          }}
          scrollToBottomOffset={insets.bottom}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: colorScheme === "dark" ? "#373737" : "#f5f5f5",
                paddingHorizontal: 6,
              }}
              renderActions={() => (
                <View
                  style={{
                    height: 44,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="add"
                    size={28}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </View>
              )}
            />
          )}
          renderAvatar={null}
          //keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </ImageBackground>
    </View>
  );
};

export default Chat;
