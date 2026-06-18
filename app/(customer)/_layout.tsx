import { Tabs } from "expo-router";
import { makeTabIcon, tabScreenOptions } from "~/lib/tabBar";

export default function CustomerLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: makeTabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="bookings"
        options={{ title: "Bookings", tabBarIcon: makeTabIcon("calendar", "calendar-outline") }}
      />
      <Tabs.Screen
        name="assistant"
        options={{ title: "Assistant", tabBarIcon: makeTabIcon("sparkles", "sparkles-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: makeTabIcon("person", "person-outline") }}
      />
      <Tabs.Screen name="service/[id]" options={{ href: null }} />
    </Tabs>
  );
}
