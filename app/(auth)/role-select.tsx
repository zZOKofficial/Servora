import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button } from "~/components";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";
import type { Role } from "~/types";

const roles = [
  {
    id: "customer" as Role,
    title: "I need a service",
    subtitle: "Book vetted technicians for home & office services",
    emoji: "🛠️",
    features: ["Browse 20+ service categories", "AI-powered smart booking", "Live technician tracking"],
  },
  {
    id: "provider" as Role,
    title: "I provide services",
    subtitle: "Earn money by offering your skills on your schedule",
    emoji: "💼",
    features: ["Set your own availability", "Accept jobs nearby", "Get paid instantly"],
  },
] as const;

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
    // Update local store — SessionGate routing effect handles the redirect.
    setRole(selected);
  }

  return (
    <View className="flex-1 bg-white px-6 pt-16 pb-10">
      <View className="w-14 h-14 bg-primary-600 rounded-2xl items-center justify-center mb-8">
        <Text className="text-white text-2xl font-bold">S</Text>
      </View>

      <Text className="text-3xl font-bold text-slate-900 mb-1">How will you use Servora?</Text>
      <Text className="text-base text-slate-500 mb-8">You can contact support to change this later</Text>

      <View className="gap-4 mb-8">
        {roles.map((role) => {
          const isSelected = selected === role.id;
          return (
            <Pressable
              key={role.id}
              onPress={() => setSelected(role.id)}
              className={[
                "border-2 rounded-2xl p-5 gap-3",
                isSelected
                  ? "border-primary-500 bg-primary-50"
                  : "border-slate-200 bg-white active:border-primary-300 active:bg-slate-50",
              ].join(" ")}
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-3xl">{role.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-slate-900">{role.title}</Text>
                  <Text className="text-sm text-slate-500">{role.subtitle}</Text>
                </View>
                <View
                  className={[
                    "w-5 h-5 rounded-full border-2 items-center justify-center",
                    isSelected ? "border-primary-600 bg-primary-600" : "border-slate-300",
                  ].join(" ")}
                >
                  {isSelected && <View className="w-2 h-2 rounded-full bg-white" />}
                </View>
              </View>

              <View className="gap-1.5 pl-1">
                {role.features.map((f) => (
                  <View key={f} className="flex-row items-center gap-2">
                    <View className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    <Text className="text-sm text-slate-600">{f}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
          <Text className="text-sm text-red-600">{error}</Text>
        </View>
      ) : null}

      <Button
        label="Continue"
        onPress={handleContinue}
        loading={loading}
        disabled={!selected}
        fullWidth
      />
    </View>
  );
}
