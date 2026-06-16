import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center gap-4 bg-white p-6">
        <Text className="text-2xl font-bold text-slate-900">Page not found</Text>
        <Link href="/" className="text-primary-600 text-base">
          Go home
        </Link>
      </View>
    </>
  );
}
