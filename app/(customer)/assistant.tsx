import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gradients } from "~/lib/theme";

const SUGGESTIONS = [
  { icon: "water-outline", text: "My kitchen sink is leaking" },
  { icon: "flash-outline", text: "Power socket stopped working" },
  { icon: "snow-outline", text: "AC not cooling properly" },
  { icon: "sparkles-outline", text: "Need a deep home clean" },
] as const;

export default function CustomerAssistant() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pt-3">
          <View className="flex-row items-center">
            <LinearGradient
              colors={gradients.brandDiagonal}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" }}
            >
              <Ionicons name="sparkles" size={20} color="#fff" />
            </LinearGradient>
            <View className="ml-3">
              <Text className="text-2xl font-bold text-slate-900">AI Assistant</Text>
              <Text className="text-sm text-slate-400">Tell us what you need</Text>
            </View>
          </View>
        </View>

        {/* Intro card */}
        <View className="px-5 mt-6">
          <LinearGradient
            colors={gradients.brandDiagonal}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, padding: 22 }}
          >
            <Ionicons name="chatbubbles-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold mt-3">
              Describe your problem in plain words
            </Text>
            <Text className="text-indigo-100 text-[14px] leading-5 mt-1.5">
              Our AI understands what you need and instantly matches you with the right service and a trusted local pro.
            </Text>
          </LinearGradient>
        </View>

        {/* Suggestions */}
        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-7 mb-3 px-5">
          Try saying
        </Text>
        <View className="px-5 gap-3">
          {SUGGESTIONS.map((s) => (
            <Pressable
              key={s.text}
              className="flex-row items-center bg-white rounded-2xl p-4 border border-slate-100 active:bg-slate-50"
              style={{ shadowColor: "#0f172a", shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 }}
            >
              <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center mr-3">
                <Ionicons name={s.icon} size={18} color="#4f46e5" />
              </View>
              <Text className="text-[14px] text-slate-700 flex-1">{s.text}</Text>
              <Ionicons name="arrow-forward" size={16} color="#cbd5e1" />
            </Pressable>
          ))}
        </View>

        <View className="items-center mt-8 px-5">
          <View className="flex-row items-center bg-slate-100 rounded-full px-3 py-1.5">
            <Ionicons name="lock-closed" size={11} color="#94a3b8" />
            <Text className="text-xs text-slate-400 ml-1.5">Full chat experience coming soon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
