import { AuthProvider } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import "../global.css";

export default function RootLayout() {
  const router = useRouter();
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
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
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                className="rounded-[20px] bg-gray-200 p-1"
              >
                <Ionicons name="close" size={30} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
