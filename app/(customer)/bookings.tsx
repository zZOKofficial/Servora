import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "~/components";

type Tab = "active" | "past";

export default function CustomerBookings() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("active");

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <View className="px-5 pt-3">
        <Text className="text-2xl font-bold text-slate-900">My Bookings</Text>

        {/* Segmented control */}
        <View className="flex-row bg-slate-100 rounded-2xl p-1 mt-5">
          {(["active", "past"] as Tab[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className={[
                "flex-1 py-2.5 rounded-xl items-center",
                tab === t ? "bg-white" : "",
              ].join(" ")}
              style={tab === t ? { shadowColor: "#0f172a", shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 } : undefined}
            >
              <Text className={[
                "text-sm font-semibold capitalize",
                tab === t ? "text-slate-900" : "text-slate-400",
              ].join(" ")}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="flex-1 justify-center">
        <EmptyState
          icon={tab === "active" ? "calendar-outline" : "checkmark-done-outline"}
          title={tab === "active" ? "No active bookings" : "No past bookings"}
          description={
            tab === "active"
              ? "Your upcoming services will appear here once you book."
              : "Completed and cancelled bookings will show up here."
          }
        />
      </View>
    </View>
  );
}
