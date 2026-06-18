import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, IconButton } from "~/components";
import { gradients } from "~/lib/theme";
import { useService } from "~/hooks/useServices";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function HeroChip({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View className="flex-row items-center bg-white/15 rounded-full px-3.5 py-2 mr-2.5">
      <Ionicons name={icon} size={14} color="#fff" style={{ marginRight: 6 }} />
      <Text className="text-white text-[13px] font-semibold">{label}</Text>
    </View>
  );
}

const INCLUDED: { icon: IconName; text: string }[] = [
  { icon: "shield-checkmark-outline", text: "Verified & background-checked professional" },
  { icon: "refresh-outline", text: "Service warranty — free re-visit if unsatisfied" },
  { icon: "navigate-outline", text: "Real-time tracking once provider is on the way" },
  { icon: "cash-outline", text: "Pay securely after the job is done" },
];

export default function ServiceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: service, isLoading, error } = useService(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (error || !service) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-8">
        <Ionicons name="alert-circle-outline" size={48} color="#cbd5e1" />
        <Text className="text-slate-700 text-lg font-bold mt-4">Service not found</Text>
        <View className="mt-6">
          <Button label="Go back" variant="outline" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 + insets.bottom }}
      >
        {/* Hero */}
        <LinearGradient
          colors={gradients.brandDiagonal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top + 12, paddingBottom: 36, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between">
            <IconButton icon="chevron-back" tone="translucent" onPress={() => router.back()} />
            <IconButton icon="heart-outline" tone="translucent" />
          </View>

          <View className="w-20 h-20 rounded-3xl bg-white/15 items-center justify-center mt-6 mb-5">
            <Ionicons name={service.icon_name as never} size={38} color="#fff" />
          </View>

          <Text className="text-indigo-100 text-[13px] font-semibold uppercase tracking-wide mb-1.5">
            {service.category}
          </Text>
          <Text className="text-white text-[28px] leading-8 font-bold mb-5">{service.title}</Text>

          <View className="flex-row">
            <HeroChip icon="cash-outline" label={`From ৳${service.base_price_bdt.toLocaleString()}`} />
            <HeroChip icon="time-outline" label={`~${service.duration_min} min`} />
          </View>
        </LinearGradient>

        {/* Body */}
        <View className="px-5 pt-7">
          <Text className="text-lg font-bold text-slate-900 mb-2.5">About this service</Text>
          <Text className="text-slate-500 text-[15px] leading-[23px]">{service.description}</Text>

          <Text className="text-lg font-bold text-slate-900 mb-3 mt-7">What's included</Text>
          <View className="bg-white rounded-3xl p-2 border border-slate-100"
            style={{ shadowColor: "#0f172a", shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}>
            {INCLUDED.map((item, i) => (
              <View
                key={item.text}
                className={[
                  "flex-row items-center px-3 py-3.5",
                  i < INCLUDED.length - 1 ? "border-b border-slate-50" : "",
                ].join(" ")}
              >
                <View className="w-9 h-9 rounded-xl bg-primary-50 items-center justify-center mr-3">
                  <Ionicons name={item.icon} size={17} color="#4f46e5" />
                </View>
                <Text className="text-[14px] text-slate-700 flex-1">{item.text}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-start bg-amber-50 rounded-2xl p-4 mt-5 border border-amber-100">
            <Ionicons name="information-circle" size={18} color="#d97706" style={{ marginTop: 1 }} />
            <Text className="text-amber-800 text-[13px] leading-5 flex-1 ml-2.5">
              <Text className="font-bold">Starting from ৳{service.base_price_bdt.toLocaleString()}. </Text>
              Final price depends on complexity. Your provider confirms before starting.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 pt-4 flex-row items-center"
        style={{ paddingBottom: insets.bottom + 14, shadowColor: "#0f172a", shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: -4 }, elevation: 12 }}
      >
        <View className="mr-4">
          <Text className="text-xs text-slate-400">Starting from</Text>
          <Text className="text-2xl font-bold text-slate-900">৳{service.base_price_bdt.toLocaleString()}</Text>
        </View>
        <View className="flex-1">
          <Button
            label="Book Now"
            icon="arrow-forward"
            iconPosition="right"
            fullWidth
            size="lg"
            onPress={() => {
              // Booking flow — M3
            }}
          />
        </View>
      </View>
    </View>
  );
}
