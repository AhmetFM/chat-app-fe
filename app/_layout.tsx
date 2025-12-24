import { AuthProvider } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
import "../global.css";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="(home)"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen name="(details)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/new-chat"
          options={{
            presentation: "modal",
            title: "New Chat",
            headerTransparent: true,
            headerBlurEffect: "regular",
            headerSearchBarOptions: {
              placeholder: "Search name or number",
              hideWhenScrolling: false,
            },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#18181b" : "#f5f5f5",
            },
            headerTitleStyle: {
              color: colorScheme === "dark" ? "#fff" : "#000",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                className="rounded-[20px] bg-gray-200 dark:bg-zinc-800 p-1"
              >
                <Ionicons
                  name="close"
                  size={30}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/change-name"
          options={{
            presentation: "modal",
            title: "Name",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "#f5f5f5",
            },
            headerBlurEffect: "regular",
          }}
        />
        <Stack.Screen
          name="(settings)/update-picture"
          options={{
            title: "Profile Picture",
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: "black",
            headerBlurEffect: "regular",
            headerTransparent: true,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
