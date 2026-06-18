import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { gradients } from "~/lib/theme";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  variant?: "default" | "inverse";
}

// The Servora brand mark — a gradient-filled rounded square with the "S" monogram.
export function Logo({ size = 56, showWordmark = false, variant = "default" }: LogoProps) {
  const mark = (
    <LinearGradient
      colors={gradients.brandDiagonal}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "Inter_700Bold",
          fontSize: size * 0.5,
          lineHeight: size * 0.6,
        }}
      >
        S
      </Text>
    </LinearGradient>
  );

  if (!showWordmark) return mark;

  return (
    <View className="flex-row items-center gap-3">
      {mark}
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: size * 0.46,
          letterSpacing: 0.5,
          color: variant === "inverse" ? "#fff" : "#0f172a",
        }}
      >
        Servora
      </Text>
    </View>
  );
}
