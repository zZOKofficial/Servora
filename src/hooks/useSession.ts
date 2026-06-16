import { useEffect } from "react";
import { supabase } from "~/lib/supabase";
import { useAuthStore } from "~/store/auth";
import type { Role } from "~/types";

export function useSession() {
  const { setSession, setRole, setLoading, clear } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchRole(session.user.id);
        } else {
          clear();
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function fetchRole(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    setRole((data?.role as Role) ?? null);
    setLoading(false);
  }
}
