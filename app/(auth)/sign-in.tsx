import { Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Button, Input, Logo } from "~/components";
import { supabase } from "~/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setLoading(false);
    if (authError) setError(authError.message);
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
          Welcome back
        </Text>
        <Text className="text-base text-slate-500 mt-2 mb-9">
          Sign in to continue to Servora
        </Text>

        <View className="gap-4 mb-5">
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
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword((s) => !s)}
            autoComplete="current-password"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(""); }}
          />
        </View>

        {error ? (
          <View className="flex-row items-center bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-5">
            <Text className="text-sm text-red-600 flex-1">{error}</Text>
          </View>
        ) : null}

        <Button label="Sign In" onPress={handleSignIn} loading={loading} fullWidth size="lg" />

        <View className="mt-10 flex-row justify-center">
          <Text className="text-slate-500 text-[15px]">Don't have an account? </Text>
          <Link href="/(auth)/sign-up" asChild>
            <Text className="text-primary-600 font-semibold text-[15px]">Sign up</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
