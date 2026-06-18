import { Pressable, Text, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  className?: string;
}

export function SectionHeader({ title, actionLabel, onActionPress, className = "" }: SectionHeaderProps) {
  return (
    <View className={["flex-row items-center justify-between", className].filter(Boolean).join(" ")}>
      <Text className="text-lg font-bold text-slate-900">{title}</Text>
      {actionLabel && (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text className="text-sm font-semibold text-primary-600">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
