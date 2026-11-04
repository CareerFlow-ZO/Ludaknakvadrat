-- LNK SHOP: private paid order ledger. Apply to the correct Supabase project before enabling sales.
create table if not exists public.lnk_shop_orders (
 id bigint generated always as identity primary key,
 stripe_session_id text not null unique,
 stripe_payment_intent_id text,
 customer_email text,
 items jsonb not null,
 amount_total_cents integer not null check (amount_total_cents >= 0),
 currency text not null default 'eur',
 payment_status text not null check (payment_status in ('paid','refunded')),
 paid_at timestamptz not null,
 created_at timestamptz not null default now()
);
alter table public.lnk_shop_orders enable row level security;
revoke all on public.lnk_shop_orders from anon, authenticated;
-- No public policies. Server-side service role writes only.
