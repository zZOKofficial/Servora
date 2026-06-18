import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white px-8">
        <View className="w-20 h-20 rounded-3xl bg-primary-50 items-center justify-center mb-6">
          <Ionicons name="compass-outline" size={36} color="#818cf8" />
        </View>
        <Text className="text-2xl font-bold text-slate-900">Page not found</Text>
        <Text className="text-[15px] text-slate-400 text-center mt-2 mb-7">
          The page you're looking for doesn't exist or has moved.
        </Text>
        <Link href="/" className="bg-primary-600 rounded-2xl px-6 py-3.5">
          <Text className="text-white font-semibold text-[15px]">Go home</Text>
        </Link>
      </View>
    </>
  );
}
