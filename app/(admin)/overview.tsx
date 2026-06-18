import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gradients } from "~/lib/theme";
import { supabase } from "~/lib/supabase";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function StatCard({ icon, label, value, tint }: { icon: IconName; label: string; value: string; tint: string }) {
  return (
    <View className="flex-1 bg-white rounded-3xl p-5 border border-slate-100"
      style={{ shadowColor: "#0f172a", shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}>
      <View className="w-10 h-10 rounded-2xl items-center justify-center" style={{ backgroundColor: tint }}>
        <Ionicons name={icon} size={19} color="#fff" />
      </View>
      <Text className="text-2xl font-bold text-slate-900 mt-4">{value}</Text>
      <Text className="text-xs text-slate-400 mt-0.5">{label}</Text>
    </View>
  );
}

export default function AdminOverview() {
  const insets = useSafeAreaInsets();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        <LinearGradient
          colors={gradients.brandDiagonal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 20, paddingBottom: 28, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-indigo-100 text-sm">Welcome back</Text>
              <Text className="text-white text-2xl font-bold mt-0.5">Admin Dashboard</Text>
            </View>
            <Pressable
              onPress={handleSignOut}
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center active:opacity-70"
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
            </Pressable>
          </View>
        </LinearGradient>

        <View className="px-5 -mt-3">
          <View className="flex-row gap-3">
            <StatCard icon="people-outline" label="Total users" value="0" tint="#4f46e5" />
            <StatCard icon="briefcase-outline" label="Providers" value="0" tint="#0ea5e9" />
          </View>
          <View className="flex-row gap-3 mt-3">
            <StatCard icon="calendar-outline" label="Bookings" value="0" tint="#f59e0b" />
            <StatCard icon="cash-outline" label="Revenue" value="৳0" tint="#10b981" />
          </View>

          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-7 mb-3 ml-1">
            Management
          </Text>
          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden"
            style={{ shadowColor: "#0f172a", shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
            {([
              { icon: "people-outline", label: "Manage Users" },
              { icon: "shield-checkmark-outline", label: "Verify Providers" },
              { icon: "list-outline", label: "All Bookings" },
              { icon: "analytics-outline", label: "Reports & Analytics" },
            ] as { icon: IconName; label: string }[]).map((item, i, arr) => (
              <View key={item.label}>
                <Pressable className="flex-row items-center px-4 py-3.5 active:bg-slate-50">
                  <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center mr-3">
                    <Ionicons name={item.icon} size={18} color="#475569" />
                  </View>
                  <Text className="flex-1 text-[15px] font-medium text-slate-800">{item.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
                </Pressable>
                {i < arr.length - 1 && <View className="h-px bg-slate-50 ml-16" />}
              </View>
            ))}
          </View>

          <View className="items-center mt-8">
            <View className="flex-row items-center bg-slate-100 rounded-full px-3 py-1.5">
              <Ionicons name="lock-closed" size={11} color="#94a3b8" />
              <Text className="text-xs text-slate-400 ml-1.5">Live data connects in M8</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
