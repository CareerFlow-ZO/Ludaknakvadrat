-- Supabase SQL schema for Ludak Na Kvadrat
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  recipient text not null,
  occasion text not null,
  style text not null,
  language text not null,
  package text not null,
  amount_cents integer not null,
  currency text not null default 'eur',
  mood text,
  deadline text,
  story text not null,
  status text not null default 'pending' check (status in ('pending','paid','in_progress','completed','cancelled')),
  stripe_session_id text unique,
  paid_at timestamptz,
  completed_at timestamptz
);

create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

alter table public.orders enable row level security;
-- The server uses the Supabase service-role key, so no public policy is required.
