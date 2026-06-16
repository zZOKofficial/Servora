import { Text, View } from "react-native";
import type { BookingStatus } from "~/types";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "neutral" | BookingStatus;

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

const variantMap: Record<string, { container: string; text: string }> = {
  primary: { container: "bg-primary-100", text: "text-primary-700" },
  success: { container: "bg-emerald-100", text: "text-emerald-700" },
  warning: { container: "bg-amber-100", text: "text-amber-700" },
  error: { container: "bg-red-100", text: "text-red-700" },
  neutral: { container: "bg-slate-100", text: "text-slate-600" },
  requested: { container: "bg-blue-100", text: "text-blue-700" },
  accepted: { container: "bg-primary-100", text: "text-primary-700" },
  en_route: { container: "bg-cyan-100", text: "text-cyan-700" },
  arrived: { container: "bg-violet-100", text: "text-violet-700" },
  in_progress: { container: "bg-amber-100", text: "text-amber-700" },
  completed: { container: "bg-emerald-100", text: "text-emerald-700" },
  reviewed: { container: "bg-emerald-100", text: "text-emerald-700" },
  declined: { container: "bg-red-100", text: "text-red-700" },
  cancelled: { container: "bg-slate-100", text: "text-slate-600" },
};

const sizeMap = {
  sm: { container: "px-2 py-0.5 rounded-md", text: "text-xs" },
  md: { container: "px-3 py-1 rounded-lg", text: "text-sm" },
};

export function Badge({ label, variant = "neutral", size = "sm" }: BadgeProps) {
  const v = variantMap[variant] ?? variantMap.neutral;
  const s = sizeMap[size];
  return (
    <View className={["self-start", v.container, s.container].join(" ")}>
      <Text className={["font-medium", v.text, s.text].join(" ")}>{label}</Text>
    </View>
  );
}
