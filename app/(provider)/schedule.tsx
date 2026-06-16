import { Text, View } from "react-native";

export default function ProviderSchedule() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-slate-900">My Schedule</Text>
      <Text className="text-slate-400 text-sm">Schedule loads in M4</Text>
    </View>
  );
}
