import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Platform } from "react-native";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";
import type { Role } from "~/types";

const REFRESH_TOKEN_KEY = "servora_refresh_token";

async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  }
}

async function loadToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

async function clearToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
}

async function fetchRole(userId: string): Promise<Role | null> {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    return (data?.role as Role) ?? null;
  } catch {
    return null;
  }
}

export function useSession() {
  const { setSession, setRole, setLoading, clear } = useAuthStore();

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        const token = await loadToken();
        if (!active) return;

        if (token) {
          const { data, error } = await supabase.auth.refreshSession({ refresh_token: token });
          if (!active) return;

          if (error || !data.session) {
            // Stored token invalid — clear it and send to login
            await clearToken();
            setLoading(false);
            return;
          }

          const role = await fetchRole(data.session.user.id);
          if (!active) return;
          setSession(data.session);
          setRole(role);
        }
      } catch {
        // Any failure → fall through to login
      } finally {
        if (active) setLoading(false);
      }
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      if (session) {
        await saveToken(session.refresh_token);
        const role = await fetchRole(session.user.id);
        if (!active) return;
        setSession(session);
        setRole(role);
      } else {
        await clearToken();
        clear();
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);
}
