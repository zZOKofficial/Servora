import { Text, View } from "react-native";

export default function AdminOverview() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-slate-900">Admin Dashboard</Text>
      <Text className="text-slate-400 text-sm">Dashboard builds in M8</Text>
    </View>
  );
}
