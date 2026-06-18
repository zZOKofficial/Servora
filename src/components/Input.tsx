import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View, type TextInputProps } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  hint,
  icon,
  rightIcon,
  onRightIconPress,
  className = "",
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderClass = error
    ? "border-red-400"
    : focused
    ? "border-primary-500"
    : "border-slate-200";

  return (
    <View className="gap-2">
      {label && <Text className="text-sm font-semibold text-slate-700 ml-1">{label}</Text>}
      <View
        className={[
          "flex-row items-center bg-white border-[1.5px] rounded-2xl px-4 h-[52px]",
          borderClass,
        ].join(" ")}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={19}
            color={focused ? "#4f46e5" : "#94a3b8"}
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          className={["flex-1 text-[15px] text-slate-900 h-full", className].join(" ")}
          placeholderTextColor="#94a3b8"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} className="ml-2 p-1" hitSlop={8}>
            <Ionicons name={rightIcon} size={19} color="#94a3b8" />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text className="text-xs text-red-500 ml-1">{error}</Text>
      ) : hint ? (
        <Text className="text-xs text-slate-400 ml-1">{hint}</Text>
      ) : null}
    </View>
  );
}
