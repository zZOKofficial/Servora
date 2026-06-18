-- Services catalogue
create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  category      text not null,
  title         text not null,
  description   text not null,
  base_price_bdt integer not null,
  duration_min  integer not null,
  icon_name     text not null,   -- Ionicons name (e.g. "construct-outline")
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "services_public_read" on public.services
  for select using (is_active = true);

-- ─── Seed data (Bangladesh prices) ──────────────────────────────────────────
insert into public.services (category, title, description, base_price_bdt, duration_min, icon_name) values

-- Plumbing
('Plumbing',    'Pipe Leak Repair',        'Fix leaking pipes, joints, and connections. Includes inspection of adjacent plumbing.', 500, 60, 'water-outline'),
('Plumbing',    'Tap & Faucet Install',    'Installation or replacement of taps, faucets, and showerheads.', 400, 45, 'settings-outline'),
('Plumbing',    'Drain Unclogging',        'Clear blocked drains in kitchen, bathroom, or toilet using professional tools.', 600, 60, 'funnel-outline'),

-- Electrical
('Electrical',  'Wiring & Rewiring',       'Safe installation or repair of household wiring. Compliant with BNBC standards.', 800, 90, 'flash-outline'),
('Electrical',  'Fan Installation',        'Ceiling fan fitting, balancing, and wiring. Includes capacitor check.', 350, 45, 'sync-outline'),
('Electrical',  'Socket & Switch Fix',     'Repair or replace faulty power sockets, light switches, and MCBs.', 300, 30, 'power-outline'),

-- AC & Cooling
('AC & Cooling', 'AC Service & Cleaning',  'Full servicing of split or window AC — coil cleaning, gas check, filter wash.', 1200, 90, 'thermometer-outline'),
('AC & Cooling', 'AC Installation',        'Professional wall mounting and installation of split AC unit.', 2000, 120, 'construct-outline'),
('AC & Cooling', 'Refrigerator Repair',    'Diagnose and fix cooling issues, compressor problems, and gas recharge.', 900, 90, 'snow-outline'),

-- Cleaning
('Cleaning',    'Deep Home Cleaning',      'Full home deep clean — floors, bathrooms, kitchen, fans, and surfaces.', 2500, 240, 'sparkles-outline'),
('Cleaning',    'Sofa & Carpet Cleaning',  'Steam or dry cleaning of sofas, carpets, and upholstery.', 1500, 120, 'color-wand-outline'),
('Cleaning',    'Bathroom Sanitisation',   'Professional disinfection and scrubbing of bathrooms and toilets.', 800, 60, 'shield-checkmark-outline'),

-- Painting
('Painting',    'Wall Painting',           'Interior wall painting with primer. Price per room; materials extra.', 3000, 480, 'brush-outline'),
('Painting',    'Grill & Gate Painting',   'Anti-rust primer and enamel paint for iron grills, gates, and railings.', 1500, 180, 'color-fill-outline'),

-- Carpentry
('Carpentry',   'Furniture Assembly',      'Assemble flat-pack or ready-made furniture — beds, wardrobes, shelves.', 600, 90, 'hammer-outline'),
('Carpentry',   'Door & Window Repair',    'Fix stiff or broken doors, windows, locks, and hinges.', 500, 60, 'keypad-outline'),

-- Pest Control
('Pest Control','Cockroach Treatment',     'Gel bait and spray treatment for cockroach elimination. Safe for food areas.', 1000, 60, 'bug-outline'),
('Pest Control','Mosquito Fogging',        'ULV fogging for mosquito and fly control. Covers entire apartment or house.', 1500, 60, 'leaf-outline'),

-- Beauty & Wellness
('Beauty',      'Home Salon — Women',      'Haircut, facial, threading, and basic grooming at your doorstep.', 800, 90, 'cut-outline'),
('Beauty',      'Massage Therapy',         'Relaxing full-body massage at home by certified therapist.', 1200, 60, 'heart-outline');
