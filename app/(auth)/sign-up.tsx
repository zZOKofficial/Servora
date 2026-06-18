import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Button, Input, Logo } from "~/components";
import { supabase } from "~/lib/supabase";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);

  async function handleSignUp() {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: { data: { full_name: trimmedName } },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    if (!data.session) {
      setAwaitingConfirm(true);
      return;
    }
    router.replace("/(auth)/role-select");
  }

  if (awaitingConfirm) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-8">
        <View className="w-20 h-20 bg-primary-50 rounded-3xl items-center justify-center mb-6">
          <Ionicons name="mail-unread-outline" size={36} color="#4f46e5" />
        </View>
        <Text className="text-2xl font-bold text-slate-900 text-center">Check your email</Text>
        <Text className="text-[15px] text-slate-500 text-center mt-3 leading-6">
          We sent a confirmation link to{"\n"}
          <Text className="font-semibold text-slate-700">{email.trim()}</Text>.{"\n"}
          Tap it to activate your account, then sign in.
        </Text>
        <View className="mt-8 w-full">
          <Button
            label="Back to Sign In"
            variant="outline"
            fullWidth
            size="lg"
            onPress={() => router.replace("/(auth)/sign-in")}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="bg-white"
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-6 pt-20 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Logo size={60} />

        <Text className="text-[32px] leading-[38px] font-bold text-slate-900 mt-8">
          Create account
        </Text>
        <Text className="text-base text-slate-500 mt-2 mb-9">
          Join Servora and get things done
        </Text>

        <View className="gap-4 mb-5">
          <Input
            label="Full name"
            icon="person-outline"
            placeholder="John Doe"
            autoCapitalize="words"
            autoComplete="name"
            value={fullName}
            onChangeText={(t) => { setFullName(t); setError(""); }}
          />
          <Input
            label="Email"
            icon="mail-outline"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={(t) => { setEmail(t); setError(""); }}
          />
          <Input
            label="Password"
            icon="lock-closed-outline"
            placeholder="Min. 6 characters"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword((s) => !s)}
            autoComplete="new-password"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(""); }}
          />
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-5">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        ) : null}

        <Button label="Create Account" onPress={handleSignUp} loading={loading} fullWidth size="lg" />

        <View className="mt-10 flex-row justify-center">
          <Text className="text-slate-500 text-[15px]">Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-primary-600 font-semibold text-[15px]">Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
