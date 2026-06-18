import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Button, Logo } from "~/components";
import { gradients } from "~/lib/theme";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";
import type { Role } from "~/types";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const roles: {
  id: Role;
  title: string;
  subtitle: string;
  icon: IoniconsName;
  features: string[];
}[] = [
  {
    id: "customer",
    title: "I need a service",
    subtitle: "Book vetted pros for home & office",
    icon: "home-outline",
    features: ["Browse 20+ categories", "AI-powered booking", "Live tracking"],
  },
  {
    id: "provider",
    title: "I provide services",
    subtitle: "Earn on your own schedule",
    icon: "briefcase-outline",
    features: ["Set availability", "Accept jobs nearby", "Get paid fast"],
  },
];

export default function RoleSelect() {
  const { user, setRole } = useAuthStore();
  const [selected, setSelected] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!selected || !user) return;
    setLoading(true);
    setError("");
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ role: selected })
      .eq("id", user.id);
    setLoading(false);
    if (dbError) {
      setError("Failed to save your role. Please try again.");
      return;
    }
    setRole(selected);
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-20 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Logo size={56} />

        <Text className="text-[32px] leading-[38px] font-bold text-slate-900 mt-8">
          How will you{"\n"}use Servora?
        </Text>
        <Text className="text-base text-slate-500 mt-2 mb-8">
          Choose your role to personalise your experience
        </Text>

        <View className="gap-4">
          {roles.map((role) => {
            const isSelected = selected === role.id;
            return (
              <Pressable
                key={role.id}
                onPress={() => setSelected(role.id)}
                className={[
                  "rounded-3xl p-5 border-2",
                  isSelected
                    ? "border-primary-500 bg-primary-50/40"
                    : "border-slate-100 bg-white",
                ].join(" ")}
                style={isSelected ? {
                  shadowColor: "#4f46e5",
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.15,
                  shadowRadius: 16,
                  elevation: 4,
                } : undefined}
              >
                <View className="flex-row items-center">
                  {isSelected ? (
                    <LinearGradient
                      colors={gradients.brandDiagonal}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center" }}
                    >
                      <Ionicons name={role.icon} size={24} color="#fff" />
                    </LinearGradient>
                  ) : (
                    <View className="w-[52px] h-[52px] rounded-2xl bg-slate-100 items-center justify-center">
                      <Ionicons name={role.icon} size={24} color="#64748b" />
                    </View>
                  )}

                  <View className="flex-1 ml-4">
                    <Text className="text-[17px] font-bold text-slate-900">{role.title}</Text>
                    <Text className="text-sm text-slate-500 mt-0.5">{role.subtitle}</Text>
                  </View>

                  <View
                    className={[
                      "w-6 h-6 rounded-full border-2 items-center justify-center",
                      isSelected ? "border-primary-600 bg-primary-600" : "border-slate-300",
                    ].join(" ")}
                  >
                    {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2 mt-4">
                  {role.features.map((f) => (
                    <View
                      key={f}
                      className={[
                        "flex-row items-center px-2.5 py-1 rounded-lg",
                        isSelected ? "bg-white" : "bg-slate-50",
                      ].join(" ")}
                    >
                      <Ionicons name="checkmark-circle" size={13} color="#818cf8" />
                      <Text className="text-xs font-medium text-slate-600 ml-1">{f}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            );
          })}
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mt-5">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View className="px-6 pb-10 pt-2 bg-white">
        <Button
          label="Continue"
          icon="arrow-forward"
          iconPosition="right"
          onPress={handleContinue}
          loading={loading}
          disabled={!selected}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}
