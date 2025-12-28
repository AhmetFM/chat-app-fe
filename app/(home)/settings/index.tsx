import CustomIcon from "@/components/CustomIcon";
import { AuthContext } from "@/context/AuthContext";
import { deleteToken } from "@/utils/storage";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const SettingsPage = () => {
  const { user, setUser, setUserToken, loading } = useContext(AuthContext);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themedStyles = styles(colorScheme!);

  const messageSettings = [
    {
      name: "Lists",
      icon: "file-tray-full-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Broadcast Lists",
      icon: "megaphone-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Starred",
      icon: "star-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
  ];

  const accountSettings = [
    {
      name: "Account",
      icon: "key-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Privacy",
      icon: "lock-closed-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Chats",
      icon: "chatbubble-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Notifications",
      icon: "notifications-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Storage and Data",
      icon: "repeat-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
  ];

  const helpSettings = [
    {
      name: "Help and feedback",
      icon: "help-circle-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
    {
      name: "Invite your friends",
      icon: "people-outline",
      color: colorScheme === "dark" ? "white" : "black",
    },
  ];

  const logout = async () => {
    setUserToken(null);
    setUser({
      id: "",
      email: "",
      name: "",
      profileImage: "",
      aboutMe: "",
    });
    await deleteToken();
    return router.navigate("/(auth)/welcome");
  };

  if (loading) {
    return (
      <View className="flex-1 h-full dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === "dark" ? "#000" : "#f5f5f5",
        }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View style={themedStyles.block}>
            <TouchableOpacity
              onPress={() => router.push("/(home)/settings/update-profile")}
            >
              <View style={{ flexDirection: "row" }}>
                {user?.profileImage ? (
                  <Image
                    source={{
                      uri: user.profileImage,
                    }}
                    width={52}
                    height={52}
                    style={{
                      borderRadius: 50,
                      margin: 10,
                    }}
                  />
                ) : (
                  <View className="w-[52px] h-[52px] m-[10px] rounded-full items-center justify-center bg-gray-500">
                    <FontAwesome name="user" size={24} color="white" />
                  </View>
                )}
                <View style={{ marginVertical: 14 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "semibold",
                      marginBottom: 2,
                      color: colorScheme === "dark" ? "#fff" : "#000",
                    }}
                  >
                    {user?.name}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 6,
                      borderRadius: 14,
                      position: "relative",
                      backgroundColor:
                        colorScheme === "dark" ? "#18181b" : "#fff",
                      flexDirection: "column",
                      borderColor:
                        colorScheme === "dark" ? "#3f3f46" : "#e5e5e5",
                    }}
                  >
                    <View style={themedStyles.outerBubble} />
                    <View style={themedStyles.bubble} />
                    <View style={themedStyles.invisibleBubble} />
                    <Text className="dark:text-white">
                      {user?.aboutMe.length! > 30
                        ? user?.aboutMe.slice(0, 30) + "..."
                        : user?.aboutMe}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons
                    name="qr-code-outline"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                    style={{
                      backgroundColor:
                        colorScheme === "dark" ? "#27272a" : "#e5e5e5",
                      padding: 8,
                      borderRadius: 50,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={themedStyles.separator} />
            <View style={themedStyles.item}>
              <MaterialIcons
                name="face"
                size={22}
                color={colorScheme === "dark" ? "white" : "black"}
                style={{ marginHorizontal: 4 }}
              />
              <Text
                className="dark:text-white"
                style={{ fontSize: 16, flex: 1, marginLeft: 4 }}
              >
                Avatar
              </Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </View>

          <View style={themedStyles.block}>
            <FlatList
              data={messageSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={themedStyles.separator} />
              )}
              renderItem={({ item }) => (
                <View style={themedStyles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text
                    className="dark:text-white"
                    style={{ fontSize: 16, flex: 1 }}
                  >
                    {item.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={themedStyles.block}>
            <FlatList
              data={accountSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={themedStyles.separator} />
              )}
              renderItem={({ item }) => (
                <View style={themedStyles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text
                    className="dark:text-white"
                    style={{ fontSize: 16, flex: 1 }}
                  >
                    {item.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={themedStyles.block}>
            <FlatList
              data={helpSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={themedStyles.separator} />
              )}
              renderItem={({ item }) => (
                <View style={themedStyles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text
                    className="dark:text-white"
                    style={{ fontSize: 16, flex: 1 }}
                  >
                    {item.name}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={themedStyles.block}>
            <TouchableOpacity
              style={themedStyles.item}
              onPress={() => logout()}
            >
              <CustomIcon name="log-out-outline" color="tomato" />
              <Text style={{ fontSize: 16, flex: 1, color: "tomato" }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = (colorScheme: string) =>
  StyleSheet.create({
    block: {
      backgroundColor: colorScheme === "dark" ? "#18181b" : "#fff",
      borderRadius: 10,
      marginHorizontal: 14,
      marginTop: 20,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 10,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colorScheme === "dark" ? "#3f3f46" : "#e5e5e5",
      marginLeft: 50,
    },
    bubble: {
      position: "absolute",
      width: 14,
      height: 14,
      borderWidth: 1,
      bottom: 0,
      left: -6,
      borderRadius: 50,
      backgroundColor: colorScheme === "dark" ? "#18181b" : "#fff",
      borderColor: colorScheme === "dark" ? "#3f3f46" : "#e5e5e5",
    },
    invisibleBubble: {
      position: "absolute",
      width: 10,
      height: 12,
      backgroundColor: colorScheme === "dark" ? "#18181b" : "#fff",
      bottom: 2,
    },
    outerBubble: {
      position: "absolute",
      width: 6,
      height: 6,
      borderRadius: 50,
      borderWidth: 1,
      left: -14,
      bottom: 10,
      borderColor: colorScheme === "dark" ? "#3f3f46" : "#e5e5e5",
    },
  });

export default SettingsPage;
