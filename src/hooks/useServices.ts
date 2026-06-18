import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type { Database } from "~/types/database";

export type Service = Database["public"]["Tables"]["services"]["Row"];

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("category");
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ["services", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Service;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  const { data: services, ...rest } = useServices();
  const categories = services
    ? ["All", ...Array.from(new Set(services.map((s) => s.category)))]
    : [];
  return { categories, ...rest };
}
