create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true,
  member_password_hash text,
  member_password_version integer not null default 1,
  member_password_updated_at timestamptz not null default now(),
  member_password_updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint site_settings_singleton_true check (singleton = true),
  constraint site_settings_singleton_unique unique (singleton),
  constraint site_settings_member_password_version_positive check (member_password_version > 0)
);

alter table public.site_settings enable row level security;

create or replace function public.set_site_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_set_updated_at on public.site_settings;

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute procedure public.set_site_settings_updated_at();

insert into public.site_settings (
  singleton,
  member_password_hash,
  member_password_version
)
values (
  true,
  null,
  1
)
on conflict (singleton) do nothing;

create policy "admins can view site settings"
on public.site_settings
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);

create policy "admins can update site settings"
on public.site_settings
for update
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  )
);
