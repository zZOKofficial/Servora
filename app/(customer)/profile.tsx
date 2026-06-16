import { Text, View } from "react-native";

export default function CustomerProfile() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-slate-900">My Profile</Text>
      <Text className="text-slate-400 text-sm">Profile loads in M1</Text>
    </View>
  );
}
