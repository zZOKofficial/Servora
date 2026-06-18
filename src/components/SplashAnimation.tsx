import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useEffect } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { gradients } from "~/lib/theme";

interface Props {
  onFinish: () => void;
}

export function SplashAnimation({ onFinish }: Props) {
  const { width } = useWindowDimensions();

  const sweepX = useSharedValue(-width * 0.6);
  const wordmarkOpacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    // Wordmark fades in
    wordmarkOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Sweep band races left → right
    sweepX.value = withDelay(
      500,
      withTiming(width * 1.6, {
        duration: 750,
        easing: Easing.out(Easing.cubic),
      })
    );

    // Hold, then fade screen out → reveal app
    screenOpacity.value = withDelay(
      1700,
      withTiming(0, { duration: 400 }, (finished) => {
        if (finished) runOnJS(onFinish)();
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bandStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sweepX.value }],
  }));

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      {/* Background gradient */}
      <LinearGradient
        colors={gradients.brandDiagonal}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Sweep band — clipped so it doesn't bleed outside the screen */}
      <View style={[StyleSheet.absoluteFill, styles.clipper]} pointerEvents="none">
        <Animated.View style={[styles.sweepBand, bandStyle]}>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,255,255,0.07)",
              "rgba(255,255,255,0.18)",
              "rgba(255,255,255,0.07)",
              "transparent",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      {/* Brand mark + wordmark */}
      <Animated.View style={[styles.wordmarkContainer, wordmarkStyle]}>
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 550, delay: 250, easing: Easing.out(Easing.cubic) }}
          style={styles.monogram}
        >
          <Text style={styles.monogramText}>S</Text>
        </MotiView>
        <Text style={styles.wordmark}>SERVORA</Text>
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 0.7, translateY: 0 }}
          transition={{ type: "timing", duration: 450, delay: 850 }}
        >
          <Text style={styles.tagline}>On-demand services, redefined</Text>
        </MotiView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  clipper: {
    overflow: "hidden",
  },
  sweepBand: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 220,
    transform: [{ skewX: "-15deg" }],
  },
  wordmarkContainer: {
    alignItems: "center",
    gap: 14,
  },
  monogram: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  monogramText: {
    fontFamily: "Inter_700Bold",
    fontSize: 40,
    color: "#ffffff",
  },
  wordmark: {
    fontFamily: "Inter_700Bold",
    fontSize: 38,
    letterSpacing: 9,
    color: "#ffffff",
  },
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    letterSpacing: 2,
    color: "#ffffff",
    textTransform: "uppercase",
  },
});
