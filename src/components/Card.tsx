import { View, type ViewProps } from "react-native";
import { shadow } from "~/lib/theme";

interface CardProps extends ViewProps {
  elevated?: boolean;
  className?: string;
}

export function Card({ elevated = false, className = "", style, children, ...props }: CardProps) {
  return (
    <View
      style={[elevated ? shadow.md : shadow.sm, style]}
      className={["bg-white rounded-2xl p-4", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </View>
  );
}
