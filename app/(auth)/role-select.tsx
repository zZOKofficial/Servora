import { Pressable, Text, View } from "react-native";
import { Button } from "~/components";

const roles = [
  {
    id: "customer",
    title: "I need a service",
    description: "Book vetted technicians for home & office services",
    emoji: "🛠️",
  },
  {
    id: "provider",
    title: "I provide services",
    description: "Earn money by offering your skills on your schedule",
    emoji: "💼",
  },
] as const;

export default function RoleSelect() {
  return (
    <View className="flex-1 bg-white px-6 pt-20 gap-8">
      <View className="gap-1">
        <Text className="text-3xl font-bold text-slate-900">How will you use Servora?</Text>
        <Text className="text-base text-slate-500">You can always change this later</Text>
      </View>

      <View className="gap-4">
        {roles.map((role) => (
          <Pressable
            key={role.id}
            className="border-2 border-slate-200 rounded-2xl p-5 gap-2 active:border-primary-500 active:bg-primary-50"
          >
            <Text className="text-3xl">{role.emoji}</Text>
            <Text className="text-lg font-semibold text-slate-900">{role.title}</Text>
            <Text className="text-sm text-slate-500">{role.description}</Text>
          </Pressable>
        ))}
      </View>

      <Button label="Continue" fullWidth />
    </View>
  );
}
