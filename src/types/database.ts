// Hand-authored stub — run `npx supabase gen types typescript --project-id <id>` to replace.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ProfileRole = "customer" | "provider" | "admin";
type BookingStatus =
  | "requested" | "accepted" | "on_the_way" | "arrived"
  | "in_progress" | "completed" | "cancelled" | "reviewed";
type PaymentMethod = "bkash" | "nagad" | "cash";
type PaymentStatus = "pending" | "paid" | "refunded";

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

      services: {
        Row: {
          id: string;
          category: string;
          title: string;
          description: string;
          base_price_bdt: number;
          duration_min: number;
          icon_name: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title: string;
          description: string;
          base_price_bdt: number;
          duration_min: number;
          icon_name: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          description?: string;
          base_price_bdt?: number;
          duration_min?: number;
          icon_name?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };

      bookings: {
        Row: {
          id: string;
          customer_id: string;
          provider_id: string | null;
          service_id: string;
          status: BookingStatus;
          address: string;
          lat: number | null;
          lng: number | null;
          scheduled_at: string | null;
          notes: string | null;
          total_bdt: number | null;
          payment_method: PaymentMethod | null;
          payment_status: PaymentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          provider_id?: string | null;
          service_id: string;
          status?: BookingStatus;
          address: string;
          lat?: number | null;
          lng?: number | null;
          scheduled_at?: string | null;
          notes?: string | null;
          total_bdt?: number | null;
          payment_method?: PaymentMethod | null;
          payment_status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          provider_id?: string | null;
          service_id?: string;
          status?: BookingStatus;
          address?: string;
          lat?: number | null;
          lng?: number | null;
          scheduled_at?: string | null;
          notes?: string | null;
          total_bdt?: number | null;
          payment_method?: PaymentMethod | null;
          payment_status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          { foreignKeyName: "bookings_customer_id_fkey"; columns: ["customer_id"]; referencedRelation: "profiles"; referencedColumns: ["id"] },
          { foreignKeyName: "bookings_provider_id_fkey"; columns: ["provider_id"]; referencedRelation: "profiles"; referencedColumns: ["id"] },
          { foreignKeyName: "bookings_service_id_fkey"; columns: ["service_id"]; referencedRelation: "services"; referencedColumns: ["id"] },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
