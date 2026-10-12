-- STAGING ONLY — NOT APPLIED TO PRODUCTION.
-- Phase B: modular tables, no anonymous access. Existing lb_invoice_drafts untouched.
create table if not exists public.lb_team_members (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 member_user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'member' check(role in ('member','manager')),
 created_at timestamptz not null default now(),
 unique(owner_id,member_user_id),
 check(owner_id <> member_user_id)
);
create table if not exists public.lb_team_channels (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check(length(trim(name)) between 1 and 80),
 created_at timestamptz not null default now(),
 unique(owner_id,id)
);
create table if not exists public.lb_team_messages (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 channel_id uuid not null,
 author_id uuid not null references auth.users(id),
 constraint lb_messages_owner_author_only check(author_id=owner_id),
 body text not null check(length(trim(body)) between 1 and 2000),
 created_at timestamptz not null default now(),
 foreign key(owner_id,channel_id) references public.lb_team_channels(owner_id,id) on delete cascade
);
create table if not exists public.lb_portal_invites (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 project_id uuid not null,
 invited_email text not null check(length(trim(invited_email)) between 3 and 254),
 invited_user_id uuid references auth.users(id),
 expires_at timestamptz not null,
 revoked_at timestamptz,
 created_at timestamptz not null default now(),
 foreign key(owner_id,project_id) references public.lb_projects(owner_id,id) on delete cascade
);
create unique index if not exists lb_invoice_drafts_owner_id_unique on public.lb_invoice_drafts(owner_id,id);
create table if not exists public.lb_payment_events (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 invoice_draft_id uuid not null,
 status text not null default 'pending' check(status in ('pending','paid_unverified','cancelled')),
 amount numeric(14,2) not null check(amount>=0),
 currency text not null default 'EUR' check(currency in ('EUR','USD','GBP')),
 note text not null default '' check(length(note)<=500),
 foreign key (owner_id,invoice_draft_id) references public.lb_invoice_drafts(owner_id,id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.lb_ai_usage (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 feature text not null check(feature in ('quote_draft','task_plan','summary')),
 tokens_used int not null default 0 check(tokens_used between 0 and 1000000),
 created_at timestamptz not null default now()
);
do $$
declare t text;
begin
  foreach t in array array['lb_team_members','lb_team_channels','lb_team_messages','lb_portal_invites','lb_payment_events','lb_ai_usage'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from anon',t);
    execute format('grant select,insert,update,delete on public.%I to authenticated',t);
    execute format('create policy %I on public.%I for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid())',t||'_owner_only',t);
  end loop;
end $$;
-- SECURITY GATES BEFORE ACTIVATION:
-- 1. Team member roles currently have NO read access to messages. Owners only until membership-aware RLS reviewed.
-- 2. Client portal invites currently do NOT grant invited users any access.
-- 3. AI is not executing remotely. No prompt contents are stored in usage log.
-- 4. Payment events are manual, UNVERIFIED records and must not count as collected payments.
-- 5. Payment draft ownership enforced by composite foreign key; do not treat manual status as verified payment.
-- 6. No migrations to existing production database.
