import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "~/components";
import { gradients } from "~/lib/theme";

function MiniStat({ icon, label, value }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; value: string }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-100"
      style={{ shadowColor: "#0f172a", shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
      <View className="w-9 h-9 rounded-xl bg-primary-50 items-center justify-center">
        <Ionicons name={icon} size={17} color="#4f46e5" />
      </View>
      <Text className="text-xl font-bold text-slate-900 mt-3">{value}</Text>
      <Text className="text-xs text-slate-400 mt-0.5">{label}</Text>
    </View>
  );
}

export default function ProviderEarnings() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-3">
          <Text className="text-2xl font-bold text-slate-900">Earnings</Text>
          <Text className="text-sm text-slate-400 mt-0.5">Track your income</Text>
        </View>

        {/* Balance card */}
        <View className="px-5 mt-5">
          <LinearGradient
            colors={gradients.brandDiagonal}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 22,
              shadowColor: "#4f46e5",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 18,
              elevation: 8,
            }}
          >
            <Text className="text-indigo-100 text-sm">Available balance</Text>
            <Text className="text-white text-4xl font-bold mt-1">৳0</Text>
            <View className="flex-row items-center mt-4">
              <View className="flex-row items-center bg-white/15 rounded-full px-3 py-1.5">
                <Ionicons name="trending-up" size={13} color="#fff" />
                <Text className="text-white text-xs font-semibold ml-1.5">This month: ৳0</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View className="flex-row px-5 mt-4 gap-3">
          <MiniStat icon="checkmark-done-outline" label="Jobs done" value="0" />
          <MiniStat icon="star-outline" label="Avg rating" value="—" />
        </View>

        <View className="mt-4">
          <EmptyState
            icon="receipt-outline"
            title="No transactions yet"
            description="Your completed jobs and payouts will be listed here."
          />
        </View>
      </ScrollView>
    </View>
  );
}
