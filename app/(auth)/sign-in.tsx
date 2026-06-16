import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button, Input } from "~/components";
import { supabase } from "~/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // On success: SessionGate in _layout.tsx handles the redirect.
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-6 pt-16 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand mark */}
        <View className="w-14 h-14 bg-primary-600 rounded-2xl items-center justify-center mb-8">
          <Text className="text-white text-2xl font-bold">S</Text>
        </View>

        <Text className="text-3xl font-bold text-slate-900 mb-1">Welcome back</Text>
        <Text className="text-base text-slate-500 mb-8">Sign in to your Servora account</Text>

        <View className="gap-4 mb-6">
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={(t) => { setEmail(t); setError(""); }}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            autoComplete="current-password"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(""); }}
          />
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        ) : null}

        <Button label="Sign In" onPress={handleSignIn} loading={loading} fullWidth />

        <View className="mt-8 items-center">
          <Text className="text-slate-500 text-base">
            Don't have an account?{" "}
            <Link href="/(auth)/sign-up" asChild>
              <Text className="text-primary-600 font-semibold">Sign up</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
