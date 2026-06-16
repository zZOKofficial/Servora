import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Input } from "~/components";
import { supabase } from "~/lib/supabase";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      // Supabase requires email confirmation — show a message.
      setAwaitingConfirm(true);
      return;
    }

    // Email confirmation disabled → session is live, go to role selection.
    router.replace("/(auth)/role-select");
  }

  if (awaitingConfirm) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6 gap-4">
        <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center">
          <Text className="text-3xl">📧</Text>
        </View>
        <Text className="text-2xl font-bold text-slate-900 text-center">Check your email</Text>
        <Text className="text-base text-slate-500 text-center">
          We sent a confirmation link to {email.trim()}. Click it to activate your account, then sign in.
        </Text>
        <Button
          label="Back to Sign In"
          variant="outline"
          onPress={() => router.replace("/(auth)/sign-in")}
        />
      </View>
    );
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

        <Text className="text-3xl font-bold text-slate-900 mb-1">Create account</Text>
        <Text className="text-base text-slate-500 mb-8">Join Servora today</Text>

        <View className="gap-4 mb-6">
          <Input
            label="Full name"
            placeholder="John Doe"
            autoCapitalize="words"
            autoComplete="name"
            value={fullName}
            onChangeText={(t) => { setFullName(t); setError(""); }}
          />
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
            placeholder="Min. 6 characters"
            secureTextEntry
            autoComplete="new-password"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(""); }}
          />
        </View>

        {error ? (
          <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        ) : null}

        <Button label="Create Account" onPress={handleSignUp} loading={loading} fullWidth />

        <View className="mt-8 items-center">
          <Text className="text-slate-500 text-base">
            Already have an account?{" "}
            <Link href="/(auth)/sign-in" asChild>
              <Text className="text-primary-600 font-semibold">Sign in</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
