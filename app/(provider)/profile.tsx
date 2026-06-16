import { Text, View } from "react-native";
import { Button, Avatar } from "~/components";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";

export default function ProviderProfile() {
  const { user } = useAuthStore();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <View className="flex-1 bg-slate-50 px-6 pt-16 gap-6">
      <Text className="text-2xl font-bold text-slate-900">Profile</Text>

      <View className="bg-white rounded-2xl p-5 flex-row items-center gap-4">
        <Avatar size={52} />
        <View className="flex-1">
          <Text className="text-base font-semibold text-slate-900">
            {user?.user_metadata?.full_name ?? "Provider"}
          </Text>
          <Text className="text-sm text-slate-500">{user?.email}</Text>
        </View>
      </View>

      <View className="mt-auto">
        <Button label="Sign Out" variant="outline" onPress={handleSignOut} fullWidth />
      </View>
    </View>
  );
}
