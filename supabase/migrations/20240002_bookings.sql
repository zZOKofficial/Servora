-- Bookings skeleton (M2: enough to store a request; tracking/payment added in later milestones)
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.profiles(id) on delete cascade,
  provider_id   uuid references public.profiles(id) on delete set null,
  service_id    uuid not null references public.services(id) on delete restrict,
  status        text not null default 'requested'
                  check (status in (
                    'requested','accepted','on_the_way','arrived',
                    'in_progress','completed','cancelled','reviewed'
                  )),
  address       text not null,
  lat           double precision,
  lng           double precision,
  scheduled_at  timestamptz,
  notes         text,
  total_bdt     integer,             -- finalised at completion
  payment_method text check (payment_method in ('bkash','nagad','cash')),
  payment_status text not null default 'pending'
                  check (payment_status in ('pending','paid','refunded')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Customers see their own bookings
create policy "bookings_customer_select" on public.bookings
  for select using (auth.uid() = customer_id);

-- Providers see bookings assigned to them
create policy "bookings_provider_select" on public.bookings
  for select using (auth.uid() = provider_id);

-- Customers can insert their own bookings
create policy "bookings_customer_insert" on public.bookings
  for insert with check (auth.uid() = customer_id);

-- Customers can cancel; providers can update status
create policy "bookings_update" on public.bookings
  for update using (
    auth.uid() = customer_id or auth.uid() = provider_id
  );

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();
