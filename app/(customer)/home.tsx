import { ScrollView, Text, View } from "react-native";
import { Card } from "~/components";

export default function CustomerHome() {
  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="px-4 pt-14 pb-8 gap-6">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-slate-900">Good morning 👋</Text>
        <Text className="text-slate-500">What do you need help with today?</Text>
      </View>

      <Card elevated>
        <Text className="text-base font-semibold text-slate-900 mb-1">Describe your problem</Text>
        <Text className="text-sm text-slate-500">Our AI will find the right service for you</Text>
      </Card>

      <View className="gap-3">
        <Text className="text-lg font-semibold text-slate-900">Popular services</Text>
        <Text className="text-slate-400 text-sm">Categories load in M2</Text>
      </View>
    </ScrollView>
  );
}
