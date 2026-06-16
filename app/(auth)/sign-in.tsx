import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Button, Input } from "~/components";

export default function SignIn() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 pt-20 pb-10 gap-6"
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-1">
        <Text className="text-3xl font-bold text-slate-900">Welcome back</Text>
        <Text className="text-base text-slate-500">Sign in to your Servora account</Text>
      </View>

      <View className="gap-4">
        <Input label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Password" placeholder="••••••••" secureTextEntry />
      </View>

      <Button label="Sign In" fullWidth />

      <Text className="text-center text-slate-500">
        Don't have an account?{" "}
        <Link href="/(auth)/sign-up" className="text-primary-600 font-medium">
          Sign up
        </Link>
      </Text>
    </ScrollView>
  );
}
