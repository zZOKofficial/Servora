import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
type Tone = "light" | "dark" | "translucent" | "muted";

interface IconButtonProps {
  icon: IconName;
  onPress?: () => void;
  size?: number;
  tone?: Tone;
}

const toneMap: Record<Tone, { container: string; color: string }> = {
  light: { container: "bg-white border border-slate-100", color: "#1e293b" },
  dark: { container: "bg-slate-900", color: "#fff" },
  translucent: { container: "bg-white/20", color: "#fff" },
  muted: { container: "bg-slate-100", color: "#475569" },
};

export function IconButton({ icon, onPress, size = 40, tone = "light" }: IconButtonProps) {
  const t = toneMap[tone];
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };
  return (
    <Pressable
      onPress={handlePress}
      hitSlop={6}
      style={{ width: size, height: size, borderRadius: size / 2.6 }}
      className={["items-center justify-center active:opacity-70", t.container].join(" ")}
    >
      <Ionicons name={icon} size={size * 0.45} color={t.color} />
    </Pressable>
  );
}
