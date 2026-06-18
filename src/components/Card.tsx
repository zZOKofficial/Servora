import { View, type ViewProps } from "react-native";
import { shadow } from "~/lib/theme";

type Elevation = "none" | "xs" | "sm" | "md" | "lg";

interface CardProps extends ViewProps {
  elevation?: Elevation;
  className?: string;
}

const elevationMap = {
  none: undefined,
  xs: shadow.xs,
  sm: shadow.sm,
  md: shadow.md,
  lg: shadow.lg,
};

export function Card({ elevation = "sm", className = "", style, children, ...props }: CardProps) {
  return (
    <View
      style={[elevationMap[elevation], style]}
      className={["bg-white rounded-3xl p-5 border border-slate-100", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </View>
  );
}
