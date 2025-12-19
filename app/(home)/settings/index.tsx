import CustomIcon from "@/components/CustomIcon";
import { AuthContext } from "@/context/AuthContext";
import { deleteToken } from "@/utils/storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SettingsPage = () => {
  const { userToken, setUserToken } = useContext(AuthContext);
  const router = useRouter();

  const messageSettings = [
    {
      name: "Lists",
      icon: "file-tray-full-outline",
      color: "black",
    },
    {
      name: "Broadcast Lists",
      icon: "megaphone-outline",
      color: "black",
    },
    {
      name: "Starred",
      icon: "star-outline",
      color: "black",
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      color: "black",
    },
  ];

  const accountSettings = [
    {
      name: "Account",
      icon: "key-outline",
      color: "black",
    },
    {
      name: "Privacy",
      icon: "lock-closed-outline",
      color: "black",
    },
    {
      name: "Chats",
      icon: "chatbubble-outline",
      color: "black",
    },
    {
      name: "Notifications",
      icon: "notifications-outline",
      color: "black",
    },
    {
      name: "Storage and Data",
      icon: "repeat-outline",
      color: "black",
    },
  ];

  const helpSettings = [
    {
      name: "Help and feedback",
      icon: "help-circle-outline",
      color: "black",
    },
    {
      name: "Invite your friends",
      icon: "people-outline",
      color: "black",
    },
  ];

  const logout = async () => {
    setUserToken(null);
    await deleteToken();
    return router.navigate("/(auth)/welcome");
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View style={styles.block}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/u/74562743?v=4",
                }}
                width={52}
                height={52}
                style={{
                  borderRadius: 50,
                  margin: 10,
                }}
              />
              <View style={{ marginVertical: 14 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "semibold",
                    marginBottom: 2,
                  }}
                >
                  Ahmet
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 14,
                    position: "relative",
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    borderColor: "#e5e5e5",
                  }}
                >
                  <View style={styles.outerBubble} />
                  <View style={styles.bubble} />
                  <View style={styles.invisibleBubble} />
                  <Text>Et tu brute</Text>
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
                  style={{
                    backgroundColor: "#e5e5e5",
                    padding: 8,
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <MaterialIcons
                name="face"
                size={22}
                style={{ marginHorizontal: 4 }}
              />
              <Text style={{ fontSize: 16, flex: 1, marginLeft: 4 }}>
                Avatar
              </Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </View>

          <View style={styles.block}>
            <FlatList
              data={messageSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text style={{ fontSize: 16, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={styles.block}>
            <FlatList
              data={accountSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text style={{ fontSize: 16, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={styles.block}>
            <FlatList
              data={helpSettings}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <CustomIcon name={item.icon} color={item.color} />

                  <Text style={{ fontSize: 16, flex: 1 }}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
              )}
            />
          </View>

          <View style={styles.block}>
            <TouchableOpacity style={styles.item} onPress={() => logout()}>
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

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#fff",
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
    backgroundColor: "#e5e5e5",
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
    backgroundColor: "#fff",
    borderColor: "#e5e5e5",
  },
  invisibleBubble: {
    position: "absolute",
    width: 10,
    height: 12,
    backgroundColor: "white",
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
    borderColor: "#e5e5e5",
  },
});

export default SettingsPage;
