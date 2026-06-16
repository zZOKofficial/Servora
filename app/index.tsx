import { ActivityIndicator, View } from "react-native";

// SessionGate in _layout.tsx handles all routing.
// This screen shows briefly while the session is being resolved.
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#4f46e5" />
    </View>
  );
}
