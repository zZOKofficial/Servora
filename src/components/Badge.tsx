import { Text, View } from "react-native";
import type { BookingStatus } from "~/types";

type BadgeVariant = "primary" | "success" | "warning" | "error" | "neutral" | "accent" | BookingStatus;

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

const variantMap: Record<string, { container: string; text: string; dot: string }> = {
  primary: { container: "bg-primary-50", text: "text-primary-700", dot: "bg-primary-500" },
  accent: { container: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  success: { container: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  warning: { container: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  error: { container: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  neutral: { container: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  requested: { container: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  accepted: { container: "bg-primary-50", text: "text-primary-700", dot: "bg-primary-500" },
  en_route: { container: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500" },
  arrived: { container: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  in_progress: { container: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  completed: { container: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  reviewed: { container: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  declined: { container: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  cancelled: { container: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

const sizeMap = {
  sm: { container: "px-2.5 py-1 rounded-lg", text: "text-xs" },
  md: { container: "px-3 py-1.5 rounded-xl", text: "text-sm" },
};

export function Badge({ label, variant = "neutral", size = "sm", dot = false }: BadgeProps) {
  const v = variantMap[variant] ?? variantMap.neutral;
  const s = sizeMap[size];
  return (
    <View className={["self-start flex-row items-center", v.container, s.container].join(" ")}>
      {dot && <View className={["w-1.5 h-1.5 rounded-full mr-1.5", v.dot].join(" ")} />}
      <Text className={["font-semibold", v.text, s.text].join(" ")}>{label}</Text>
    </View>
  );
}
