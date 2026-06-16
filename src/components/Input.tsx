import { useState } from "react";
import { Pressable, Text, TextInput, View, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
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
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm font-medium text-slate-700">{label}</Text>
      )}
      <View
        className={[
          "flex-row items-center bg-white border rounded-xl px-3",
          borderClass,
        ].join(" ")}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className={["flex-1 py-3 text-base text-slate-900", className].join(" ")}
          placeholderTextColor="#94a3b8"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            className="ml-2 p-1"
            hitSlop={8}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error ? (
        <Text className="text-xs text-red-500">{error}</Text>
      ) : hint ? (
        <Text className="text-xs text-slate-400">{hint}</Text>
      ) : null}
    </View>
  );
}
