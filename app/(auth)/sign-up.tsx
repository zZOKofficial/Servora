import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Button, Input } from "~/components";

export default function SignUp() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 pt-20 pb-10 gap-6"
      keyboardShouldPersistTaps="handled"
    >
      <View className="gap-1">
        <Text className="text-3xl font-bold text-slate-900">Create account</Text>
        <Text className="text-base text-slate-500">Join Servora today</Text>
      </View>

      <View className="gap-4">
        <Input label="Full name" placeholder="John Doe" autoCapitalize="words" />
        <Input label="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label="Phone" placeholder="+880 1234-567890" keyboardType="phone-pad" />
        <Input label="Password" placeholder="••••••••" secureTextEntry />
      </View>

      <Button label="Create Account" fullWidth />

      <Text className="text-center text-slate-500">
        Already have an account?{" "}
        <Link href="/(auth)/sign-in" className="text-primary-600 font-medium">
          Sign in
        </Link>
      </Text>
    </ScrollView>
  );
}
