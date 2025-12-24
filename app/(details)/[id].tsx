import useChat from "@/hooks/useChat";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Platform, View } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chat = () => {
  const insets = useSafeAreaInsets();
  const { id: conversationId } = useLocalSearchParams();
  //const [messages, setMessages] = useState<any>([]);
  const [text, setText] = useState("");

  const { messages, sendMessage, user } = useChat(conversationId as string);

  // If you have a tab bar, include its height
  const tabbarHeight = 50;
  const keyboardTopToolbarHeight = Platform.select({ ios: 16, default: 0 });
  const keyboardVerticalOffset =
    insets.bottom + tabbarHeight + keyboardTopToolbarHeight;

  /* useEffect(() => {
    setMessages([
      ...messageData.map((message) => ({
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.date),
        user: {
          _id: message.from,
          name: message.from ? "You" : "Bob",
        },
      })),
      {
        _id: 0,
        system: true,
        text: "All your base are belongs to us",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
 */
  return (
    <ImageBackground
      source={{ uri: "https://i.redd.it/qwd83nc4xxf41.jpg" }}
      style={{
        flex: 1,
        marginBottom: insets.bottom,
        backgroundColor: "#f5f5f5",
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={sendMessage}
        user={{ _id: user.id }}
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
              right: {
                color: "#000",
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: "#fff",
              },
              right: {
                backgroundColor: "#dcf8c6",
              },
            }}
          />
        )}
        renderSend={(props) => (
          <View
            style={{
              flexDirection: "row",
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text.length > 0 && (
              <Send
                containerStyle={{
                  justifyContent: "center",
                }}
                {...props}
              >
                <Ionicons name="send" size={28} />
              </Send>
            )}
            {text.length === 0 && (
              <>
                <Ionicons name="camera-outline" size={28} />
                <Ionicons name="mic-outline" size={28} />
              </>
            )}
          </View>
        )}
        maxComposerHeight={100}
        textInputProps={{
          onChangeText: setText,
          style: {
            backgroundColor: "white",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#e5e5e5",
            paddingHorizontal: 10,
            fontSize: 16,
            paddingTop: 4,
          },
        }}
        scrollToBottomOffset={insets.bottom}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "#f5f5f5",
            }}
            renderActions={() => (
              <View
                style={{
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add" size={28} />
              </View>
            )}
          />
        )}
        keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
      />
    </ImageBackground>
  );
};

export default Chat;
