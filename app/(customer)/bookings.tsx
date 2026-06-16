import { Text, View } from "react-native";

export default function CustomerBookings() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center gap-2">
      <Text className="text-xl font-semibold text-slate-900">My Bookings</Text>
      <Text className="text-slate-400 text-sm">Booking list loads in M3</Text>
    </View>
  );
}
