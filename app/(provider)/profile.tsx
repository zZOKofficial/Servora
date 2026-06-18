import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Badge, SettingsRow } from "~/components";
import { gradients } from "~/lib/theme";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-white text-xl font-bold">{value}</Text>
      <Text className="text-indigo-100 text-xs mt-0.5">{label}</Text>
    </View>
  );
}

export default function ProviderProfile() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const fullName = user?.user_metadata?.full_name ?? "Provider";

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <LinearGradient
          colors={gradients.brandDiagonal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 20, paddingBottom: 28, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center">
            <View className="rounded-full border-[3px] border-white/30">
              <Avatar name={fullName} size={68} />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-white text-xl font-bold">{fullName}</Text>
              <Text className="text-indigo-100 text-sm mt-0.5">{user?.email}</Text>
              <View className="mt-2 flex-row">
                <Badge label="Service Provider" variant="accent" />
              </View>
            </View>
          </View>

          <View className="flex-row mt-6 bg-white/10 rounded-2xl py-4">
            <StatCell value="0" label="Jobs" />
            <View className="w-px bg-white/20" />
            <StatCell value="—" label="Rating" />
            <View className="w-px bg-white/20" />
            <StatCell value="৳0" label="Earned" />
          </View>
        </LinearGradient>

        <View className="px-5 -mt-4">
          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden"
            style={{ shadowColor: "#0f172a", shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
            <SettingsRow icon="person-outline" label="Edit Profile" />
            <View className="h-px bg-slate-50 ml-16" />
            <SettingsRow icon="construct-outline" label="My Skills & Services" />
            <View className="h-px bg-slate-50 ml-16" />
            <SettingsRow icon="time-outline" label="Availability" />
          </View>

          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-6 mb-2 ml-1">
            Account
          </Text>
          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden"
            style={{ shadowColor: "#0f172a", shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
            <SettingsRow icon="card-outline" label="Payout Method" />
            <View className="h-px bg-slate-50 ml-16" />
            <SettingsRow icon="notifications-outline" label="Notifications" />
            <View className="h-px bg-slate-50 ml-16" />
            <SettingsRow icon="help-circle-outline" label="Help & Support" />
          </View>

          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden mt-6"
            style={{ shadowColor: "#0f172a", shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
            <SettingsRow icon="log-out-outline" label="Sign Out" tone="danger" showChevron={false} onPress={handleSignOut} />
          </View>

          <View className="items-center mt-8">
            <Text className="text-xs text-slate-300">Servora v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
