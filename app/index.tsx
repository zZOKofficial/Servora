import { ActivityIndicator, View } from "react-native";
import { Logo } from "~/components";

// SessionGate in _layout.tsx handles routing once session resolves.
// SplashAnimation overlays this — the brand mark keeps the transition seamless
// if session resolution outlasts the 2s animation.
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-8">
      <Logo size={64} />
      <ActivityIndicator size="small" color="#4f46e5" />
    </View>
  );
}
