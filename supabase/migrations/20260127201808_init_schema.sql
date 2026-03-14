-- Active: 1754944880184@@127.0.0.1@5432
create table if not exists public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null check (role in ('admin', 'member')) default 'member',
  created_at timestamptz not null default now(),
  last_updated_at timestamptz not null default now(),

  primary key (id)
);

alter table public.profiles enable row level security;

create table if not exists public.officers (
    id uuid not null primary key default gen_random_uuid(),
    headshot_href text not null default '/headshot_placeholder.png',
    officer_role text not null unique,
    role_type text not null check (role_type in ('executive', 'chair')),
    email text not null,
    officer_description text not null,
    branch text,
    last_updated_at timestamptz not null default now(),
    updated_by uuid references public.profiles(id) on delete set null,
    display_order integer not null default 0

);

alter table public.officers enable row level security;


-- RLS Policies profiles
create policy "users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "users can update own profile"
on public.profiles
for update
using (auth.uid() = id);



-- RLS policies officers
create policy "public can view officers"
on public.officers
for select
using (true);

create policy "admins can insert officers"
on public.officers
for insert
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

create policy "admins can update officers"
on public.officers
for update
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

create policy "admins can delete officers"
on public.officers
for delete
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);