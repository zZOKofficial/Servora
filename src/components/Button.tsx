import { ActivityIndicator, Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: "bg-primary-600 active:bg-primary-700",
    text: "text-white font-semibold",
  },
  secondary: {
    container: "bg-primary-100 active:bg-primary-200",
    text: "text-primary-700 font-semibold",
  },
  outline: {
    container: "border border-primary-600 bg-transparent active:bg-primary-50",
    text: "text-primary-600 font-semibold",
  },
  ghost: {
    container: "bg-transparent active:bg-slate-100",
    text: "text-primary-600 font-medium",
  },
  danger: {
    container: "bg-red-500 active:bg-red-600",
    text: "text-white font-semibold",
  },
};

const sizeClasses: Record<Size, { container: string; text: string }> = {
  sm: { container: "px-3 py-2 rounded-lg", text: "text-sm" },
  md: { container: "px-5 py-3 rounded-xl", text: "text-base" },
  lg: { container: "px-6 py-4 rounded-xl", text: "text-lg" },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const isDisabled = disabled || loading;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={[
        "flex-row items-center justify-center",
        v.container,
        s.container,
        fullWidth ? "w-full" : "self-start",
        isDisabled ? "opacity-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" || variant === "danger" ? "#fff" : "#4f46e5"}
        />
      ) : (
        <Text className={[v.text, s.text].join(" ")}>{label}</Text>
      )}
    </Pressable>
  );
}
