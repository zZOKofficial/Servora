import "../global.css";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSession } from "~/hooks/useSession";
import { queryClient } from "~/lib/queryClient";
import { useAuthStore } from "~/store/auth";

SplashScreen.preventAutoHideAsync();

function SessionGate() {
  const { session, role, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useSession();

  useEffect(() => {
    if (isLoading) return;

    const segs = segments as string[];
    const inAuth = segs[0] === "(auth)";
    const onRoleSelect = segs[1] === "role-select";

    if (!session) {
      if (!inAuth) router.replace("/(auth)/sign-in");
      return;
    }

    // Signed in but still in auth group → redirect to app
    if (!inAuth) return;

    // Let the user finish role selection before redirecting
    if (onRoleSelect && !role) return;

    switch (role) {
      case "customer":
        router.replace("/(customer)/home");
        break;
      case "provider":
        router.replace("/(provider)/jobs");
        break;
      case "admin":
        router.replace("/(admin)/overview");
        break;
      default:
        if (!onRoleSelect) router.replace("/(auth)/role-select");
    }
  }, [session, role, isLoading, segments]);

  return <Slot />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SessionGate />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
