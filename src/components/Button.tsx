import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { shadow } from "~/lib/theme";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
}

const variantClasses: Record<Variant, { container: string; text: string }> = {
  primary: { container: "bg-primary-600", text: "text-white font-semibold" },
  secondary: { container: "bg-primary-50", text: "text-primary-700 font-semibold" },
  outline: { container: "border border-slate-200 bg-white", text: "text-slate-800 font-semibold" },
  ghost: { container: "bg-transparent", text: "text-primary-600 font-semibold" },
  danger: { container: "bg-red-500", text: "text-white font-semibold" },
};

const sizeClasses: Record<Size, { container: string; text: string; icon: number }> = {
  sm: { container: "px-4 h-10 rounded-xl", text: "text-sm", icon: 16 },
  md: { container: "px-5 h-12 rounded-2xl", text: "text-[15px]", icon: 18 },
  lg: { container: "px-6 h-14 rounded-2xl", text: "text-base", icon: 20 },
};

const iconColor: Record<Variant, string> = {
  primary: "#fff",
  secondary: "#4338ca",
  outline: "#1e293b",
  ghost: "#4f46e5",
  danger: "#fff",
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
}: ButtonProps) {
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const isDisabled = disabled || loading;
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Animated.View style={[animStyle, fullWidth ? { width: "100%" } : { alignSelf: "flex-start" }]}>
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        onPressIn={() => (scale.value = withTiming(0.97, { duration: 90 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 120 }))}
        style={variant === "primary" && !isDisabled ? shadow.glow : undefined}
        className={[
          "flex-row items-center justify-center",
          v.container,
          s.container,
          fullWidth ? "w-full" : "",
          isDisabled ? "opacity-40" : "",
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
          <View className="flex-row items-center">
            {icon && iconPosition === "left" && (
              <Ionicons name={icon} size={s.icon} color={iconColor[variant]} style={{ marginRight: 8 }} />
            )}
            <Text className={[v.text, s.text].join(" ")}>{label}</Text>
            {icon && iconPosition === "right" && (
              <Ionicons name={icon} size={s.icon} color={iconColor[variant]} style={{ marginLeft: 8 }} />
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
