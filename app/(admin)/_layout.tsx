import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name="overview" options={{ title: "Overview", headerShown: false }} />
    </Stack>
  );
}
