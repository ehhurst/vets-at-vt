begin;

create table if not exists public.healthcheck (
  id bigserial primary key,
  created_at timestamptz not null default now()
);

insert into public.healthcheck default values;

commit;