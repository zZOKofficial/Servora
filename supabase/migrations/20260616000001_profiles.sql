-- M1: profiles table — one row per auth user, created by trigger on sign-up.

create table if not exists public.profiles (
  id             uuid        primary key references auth.users(id) on delete cascade,
  role           text        check (role in ('customer', 'provider', 'admin')),
  full_name      text        not null default '',
  phone          text,
  avatar_url     text,
  default_address text,
  lat            numeric,
  lng            numeric,
  created_at     timestamptz not null default now()
);

-- RLS: users see and edit only their own row.
alter table public.profiles enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'profiles'
      and policyname = 'profiles: self read'
  ) then
    create policy "profiles: self read"
      on public.profiles for select
      using (auth.uid() = id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'profiles'
      and policyname = 'profiles: self update'
  ) then
    create policy "profiles: self update"
      on public.profiles for update
      using (auth.uid() = id);
  end if;
end $$;

-- Trigger: auto-insert a profile stub when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
