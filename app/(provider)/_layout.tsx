import { Tabs } from "expo-router";
import { makeTabIcon, tabScreenOptions } from "~/lib/tabBar";

export default function ProviderLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="jobs"
        options={{ title: "Jobs", tabBarIcon: makeTabIcon("briefcase", "briefcase-outline") }}
      />
      <Tabs.Screen
        name="schedule"
        options={{ title: "Schedule", tabBarIcon: makeTabIcon("calendar", "calendar-outline") }}
      />
      <Tabs.Screen
        name="earnings"
        options={{ title: "Earnings", tabBarIcon: makeTabIcon("wallet", "wallet-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: makeTabIcon("person", "person-outline") }}
      />
    </Tabs>
  );
}
