import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface SettingsRowProps {
  icon: IconName;
  label: string;
  value?: string;
  onPress?: () => void;
  tone?: "default" | "danger";
  showChevron?: boolean;
}

export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  tone = "default",
  showChevron = true,
}: SettingsRowProps) {
  const isDanger = tone === "danger";
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-3.5 active:bg-slate-50"
    >
      <View
        className={[
          "w-9 h-9 rounded-xl items-center justify-center mr-3",
          isDanger ? "bg-red-50" : "bg-slate-100",
        ].join(" ")}
      >
        <Ionicons name={icon} size={18} color={isDanger ? "#ef4444" : "#475569"} />
      </View>
      <Text
        className={[
          "flex-1 text-[15px] font-medium",
          isDanger ? "text-red-500" : "text-slate-800",
        ].join(" ")}
      >
        {label}
      </Text>
      {value && <Text className="text-sm text-slate-400 mr-2">{value}</Text>}
      {showChevron && !isDanger && (
        <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
      )}
    </Pressable>
  );
}
