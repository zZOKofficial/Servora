// Hand-authored stub — run `npx supabase gen types typescript --project-id <id>` to replace.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ProfileRole = "customer" | "provider" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: ProfileRole | null;
          full_name: string;
          phone: string | null;
          avatar_url: string | null;
          default_address: string | null;
          lat: number | null;
          lng: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: ProfileRole | null;
          full_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          default_address?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: ProfileRole | null;
          full_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          default_address?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
