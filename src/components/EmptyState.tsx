import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Button } from "./Button";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center justify-center px-8 py-16">
      <View className="w-20 h-20 rounded-3xl bg-primary-50 items-center justify-center mb-5">
        <Ionicons name={icon} size={34} color="#818cf8" />
      </View>
      <Text className="text-lg font-bold text-slate-900 text-center">{title}</Text>
      {description && (
        <Text className="text-sm text-slate-400 text-center mt-2 leading-5">{description}</Text>
      )}
      {actionLabel && onAction && (
        <View className="mt-6">
          <Button label={actionLabel} onPress={onAction} size="md" />
        </View>
      )}
    </View>
  );
}
