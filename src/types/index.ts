export type Role = "customer" | "provider" | "admin";

export type BookingStatus =
  | "requested"
  | "accepted"
  | "en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "reviewed"
  | "declined"
  | "cancelled";

export type PaymentMethod = "bkash" | "nagad" | "cash";

export type PaymentStatus = "pending" | "paid" | "refunded";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: string;
  role: Role;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  default_address: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
}
