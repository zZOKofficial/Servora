import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "~/components";

export default function ProviderJobs() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <View className="px-5 pt-3">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-900">Available Jobs</Text>
            <Text className="text-sm text-slate-400 mt-0.5">Nearby requests for you</Text>
          </View>
          <View className="flex-row items-center bg-emerald-50 rounded-full px-3 py-2">
            <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
            <Text className="text-xs font-semibold text-emerald-700">Online</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 justify-center">
        <EmptyState
          icon="briefcase-outline"
          title="No jobs yet"
          description="New service requests in your area will appear here. Stay online to receive them."
        />
      </View>
    </View>
  );
}
