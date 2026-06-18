import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  /** Apply top safe-area inset as padding. Default true. */
  edges?: { top?: boolean; bottom?: boolean };
  className?: string;
}

// Standard screen container — handles safe-area insets consistently.
export function Screen({
  edges = { top: true, bottom: false },
  className = "",
  style,
  children,
  ...props
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          paddingTop: edges.top ? insets.top : 0,
          paddingBottom: edges.bottom ? insets.bottom : 0,
        },
        style,
      ]}
      className={["flex-1 bg-slate-50", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </View>
  );
}
