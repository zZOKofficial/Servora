# Servora — Build Plan (v1)

## Context
Servora is an on-demand services marketplace (book a vetted technician/expert — PC servicing, plumber, electrician, etc. — for a chosen timeframe; they arrive and fulfill the request). This is a **greenfield, solo, portfolio-grade** build (no deadline, flagship quality) intended both for a hackathon and as a showcase development profile piece.

Decisions locked:
- **Roles:** Customer + Provider + Admin (all three real).
- **Backend:** Supabase (Postgres, Auth, Realtime, Storage, RLS, Edge Functions).
- **Headline features:** Live tracking (Uber-style) **and** AI smart intake + assistant + matching.
- **Market:** Bangladesh / South Asia; payments **simulated** (bKash/Nagad-style UI, no real gateway).
- **Delivery:** One Expo codebase → mobile (customer + provider) + **web admin dashboard** via react-native-web.
- **AI:** Provider-agnostic layer (plug in Anthropic *or* OpenAI key later) behind a Supabase Edge Function.

Goal: a cohesive, beautifully polished, genuinely-working three-sided marketplace with a clear 3–5 minute demo narrative.

---

## Tech Stack
- **Expo (managed) + Expo Router** (file-based routing, web target built in) + **TypeScript**
- **Supabase JS client** + **TanStack Query** (server state) + **Zustand** (ephemeral UI/session state)
- **NativeWind v4** (Tailwind for RN, works on web too) + in-house design-system components
- **Reanimated + Moti** (micro-interactions), **@gorhom/bottom-sheet**, **expo-haptics**, **expo-font**
- **react-native-maps** (Google) for live tracking on mobile — requires **EAS dev build**, not Expo Go
- **Expo Notifications** for push (status updates)
- **Supabase Edge Functions** (Deno) for the AI layer — key never ships in the app
- **react-native-gifted-charts** for admin charts (works on web)

---

## Project Structure
```
servora/
  app/                      # Expo Router routes
    _layout.tsx             # loads session, routes by role
    (auth)/                 # sign-in, sign-up, role-select, onboarding
    (customer)/             # tabs: home, bookings, assistant, profile
    (provider)/             # tabs: jobs, schedule, earnings, profile
    (admin)/                # web dashboard: overview, categories, providers, bookings, users
  src/
    components/             # design system: Button, Card, Input, Badge, Avatar, Sheet, StatusTimeline…
    features/               # auth, bookings, tracking, ai, categories, reviews, payments, providers
    lib/                    # supabase.ts, queryClient.ts, theme/tokens, notifications
    hooks/  store/  types/  # types/ holds generated Supabase types
  supabase/
    migrations/             # SQL schema + RLS
    functions/              # ai-intake, ai-chat, ai-match (Edge Functions)
    seed.sql                # categories + demo providers/customers/bookings
  assets/                   # icon, splash, fonts, illustrations
```

Role routing: after auth, read `profiles.role` → redirect into the matching route group. Admin group exercised on the web build (`expo start --web`).

---

## Data Model (Supabase / Postgres)
| Table | Key columns |
|---|---|
| `profiles` | id→auth.users, role enum (customer\|provider\|admin), full_name, phone, avatar_url, default_address, lat, lng |
| `service_categories` | id, name, slug, icon, description, base_price, active |
| `provider_profiles` | user_id, bio, rating, jobs_done, verified, is_available, service_radius_km, category_ids[] |
| `bookings` | id, customer_id, provider_id, category_id, status enum, scheduled_at, address, lat, lng, notes, price |
| `booking_status_events` | id, booking_id, status, created_at — **powers the live timeline** |
| `provider_locations` | provider_id, lat, lng, updated_at — **Realtime source for map marker** |
| `reviews` | id, booking_id, customer_id, provider_id, rating, comment |
| `payments` | id, booking_id, amount, method, status — **simulated** |
| `ai_messages` | id, user_id, booking_id?, role, content, created_at |
| `notifications` | id, user_id, type, payload, read, created_at |

**Booking state machine:** `requested → accepted → en_route → arrived → in_progress → completed → reviewed` (+ `declined` / `cancelled`). Every transition inserts a `booking_status_events` row — single source of truth for both the customer timeline and provider workflow.

**Security:** RLS on every table. Customers see only their bookings; providers see assigned/offered jobs; admin (service-role claim) sees all.

---

## AI Layer (provider-agnostic Edge Functions)
Three Edge Functions read `AI_PROVIDER` + key from secrets:
1. **`ai-intake`** — customer free text → `{category, urgency, price_estimate, summary, clarifying_questions}` → pre-fills booking form
2. **`ai-chat`** — in-app assistant; history stored in `ai_messages`
3. **`ai-match`** — rank available providers by category + rating + distance + availability; deterministic fallback when no key is set

---

## Live Tracking (headline #1)
- Provider pushes location to `provider_locations` (real GPS or **simulated mover** for demos)
- Customer screen subscribes via **Supabase Realtime** → moving marker, ETA, animated status timeline, push notification on each status transition

---

## Build Milestones
Each milestone ends in something demoable.

| # | Milestone | Key deliverable |
|---|---|---|
| M0 | Foundation | Expo + Router + TS + NativeWind + theme/tokens + base components + EAS dev build |
| M1 | Auth & role routing | Sign up/in, role select, profile bootstrap, redirect-by-role |
| M2 | Schema & seed | Migrations, RLS, seed.sql, generated TS types |
| M3 | Customer happy path | Browse → AI intake → timeframe → match → confirm → simulated payment |
| M4 | Provider app | Jobs, accept/decline, advance status, push location |
| M5 | Live tracking | Realtime map + status timeline + push notifications |
| M6 | AI layer | ai-intake + ai-chat + ai-match Edge Functions wired into the app |
| M7 | Reviews & notifications | Post-job review, rating aggregation, notifications center |
| M8 | Admin web dashboard | KPIs + charts, category CRUD, provider approval, tables |
| M9 | Polish pass | Onboarding, icon/splash, skeletons, empty/error states, dark mode, demo script |

---

## Open Items (define during M0)
- Brand identity: color palette, typography, logo
- Final category list and base prices
- Real GPS vs. simulated mover for provider location (recommend simulated for reliable on-stage demos)

---

## Verification (end-to-end demo path)
1. `expo start` → EAS dev client on two devices (customer + provider)
2. `expo start --web` → admin dashboard in browser
3. Supabase project with migrations + seed applied
4. **Demo path:** customer books via AI intake → provider accepts + advances status → customer watches marker move + timeline update live → completion → review → reflected on admin dashboard
5. **AI:** Edge Function secrets set; verify intake/chat/match; confirm deterministic fallback with no key
