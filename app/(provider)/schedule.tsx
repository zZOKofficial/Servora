import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "~/components";

export default function ProviderSchedule() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <View className="px-5 pt-3">
        <Text className="text-2xl font-bold text-slate-900">My Schedule</Text>
        <Text className="text-sm text-slate-400 mt-0.5">Your upcoming appointments</Text>
      </View>
      <View className="flex-1 justify-center">
        <EmptyState
          icon="calendar-outline"
          title="Nothing scheduled"
          description="Accepted jobs and their time slots will show up on your schedule here."
        />
      </View>
    </View>
  );
}
