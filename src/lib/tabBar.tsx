import { Ionicons } from "@expo/vector-icons";
import { Platform, type ColorValue } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

// Shared premium tab-bar styling for customer & provider tab groups.
export const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: "#4f46e5",
  tabBarInactiveTintColor: "#94a3b8",
  tabBarLabelStyle: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    marginTop: 2,
  },
  tabBarStyle: {
    backgroundColor: "#ffffff",
    borderTopColor: "#f1f5f9",
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? 88 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 28 : 8,
  },
} as const;

export function makeTabIcon(active: IconName, inactive: IconName) {
  return ({ focused, color }: { focused: boolean; color: ColorValue }) => (
    <Ionicons name={focused ? active : inactive} size={23} color={color} />
  );
}
