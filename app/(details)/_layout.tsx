import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function DetailLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
