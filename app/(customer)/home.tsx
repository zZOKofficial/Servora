import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, EmptyState } from "~/components";
import { gradients } from "~/lib/theme";
import { useCategories, useServices, type Service } from "~/hooks/useServices";
import { useAuthStore } from "~/store/auth";

// ─── Category tab ─────────────────────────────────────────────────────────────
function CategoryTab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="mr-7 pb-3 items-center">
      <Text className={`text-[15px] font-semibold ${active ? "text-slate-900" : "text-slate-400"}`}>
        {label}
      </Text>
      {active && <View className="absolute bottom-0 h-[3px] w-5 bg-primary-600 rounded-full" />}
    </Pressable>
  );
}

// ─── Service row ──────────────────────────────────────────────────────────────
function ServiceRow({ service }: { service: Service }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/(customer)/service/${service.id}` as never)}
      className="flex-row items-center bg-white rounded-3xl p-3.5 mb-3 border border-slate-100 active:scale-[0.98]"
      style={{ shadowColor: "#0f172a", shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 }}
    >
      <View className="w-14 h-14 rounded-2xl bg-primary-50 items-center justify-center mr-4">
        <Ionicons name={service.icon_name as never} size={24} color="#4f46e5" />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-bold text-slate-900">{service.title}</Text>
        <Text className="text-xs text-slate-400 mt-0.5">{service.category}</Text>
        <View className="flex-row items-center mt-1.5">
          <Text className="text-sm font-bold text-primary-600">৳{service.base_price_bdt.toLocaleString()}</Text>
          <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
          <Ionicons name="time-outline" size={12} color="#94a3b8" />
          <Text className="text-xs text-slate-400 ml-1">{service.duration_min} min</Text>
        </View>
      </View>
      <View className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center">
        <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
      </View>
    </Pressable>
  );
}

// ─── AI hero banner ───────────────────────────────────────────────────────────
function AIBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="mb-6 active:scale-[0.99]">
      <LinearGradient
        colors={gradients.brandDiagonal}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 18,
          shadowColor: "#4f46e5",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 18,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center mr-4">
            <Ionicons name="sparkles" size={22} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-[16px]">Describe your problem</Text>
            <Text className="text-indigo-100 text-[13px] mt-0.5">
              Our AI finds the right pro for you
            </Text>
          </View>
          <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────────────
export default function CustomerHome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { session } = useAuthStore();
  const fullName = session?.user?.user_metadata?.full_name ?? "there";
  const firstName = fullName.split(" ")[0];

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: services, isLoading } = useServices();
  const { categories } = useCategories();

  const filtered = (services ?? []).filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-5 pt-3 bg-slate-50">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-sm text-slate-400">{getGreeting()},</Text>
            <Text className="text-2xl font-bold text-slate-900 mt-0.5">{firstName}</Text>
          </View>
          <Pressable onPress={() => router.push("/(customer)/profile")} className="active:opacity-70">
            <Avatar name={fullName} size={46} />
          </Pressable>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl mt-5 px-4 h-[52px]"
          style={{ shadowColor: "#0f172a", shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 }}>
          <Ionicons name="search-outline" size={19} color="#94a3b8" style={{ marginRight: 10 }} />
          <TextInput
            className="flex-1 text-[15px] text-slate-900 h-full"
            placeholder="Search for a service..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#cbd5e1" />
            </Pressable>
          )}
        </View>

        {/* Category tabs */}
        <View className="mt-5 border-b border-slate-100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {categories.map((cat) => (
              <CategoryTab key={cat} label={cat} active={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* List */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => <ServiceRow service={item} />}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: insets.bottom + 24 }}
          ListHeaderComponent={
            activeCategory === "All" && search.trim() === ""
              ? <AIBanner onPress={() => router.push("/(customer)/assistant")} />
              : null
          }
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title="No services found"
              description="Try a different category or search term"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
