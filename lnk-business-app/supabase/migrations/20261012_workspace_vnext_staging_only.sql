-- LNK BUSINESS workspace vNext — STAGING-ONLY migration, NOT APPLIED
-- Run ONLY on isolated Supabase development branch after review.
-- Every table is owned by auth.uid(); no anonymous policies.
create extension if not exists pgcrypto;
create table if not exists public.lb_projects (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 client_id uuid references public.lb_clients(id) on delete set null,
 name text not null check (char_length(trim(name)) between 1 and 120),
 description text not null default '' check (char_length(description)<=4000),
 status text not null default 'planned' check(status in ('planned','active','blocked','done')),
 due_date date,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(owner_id,id)
);
create table if not exists public.lb_tasks (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 project_id uuid not null,
 title text not null check(char_length(trim(title)) between 1 and 160),
 status text not null default 'todo' check(status in ('todo','doing','blocked','done')),
 due_date date,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 foreign key (owner_id,project_id) references public.lb_projects(owner_id,id) on delete cascade
);
create table if not exists public.lb_leads (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 client_id uuid references public.lb_clients(id) on delete set null,
 name text not null check(char_length(trim(name)) between 1 and 120),
 stage text not null default 'new' check(stage in ('new','contacted','proposal','won','lost')),
 estimated_value numeric(14,2) not null default 0 check(estimated_value between 0 and 999999999999.99),
 currency text not null default 'EUR' check(currency in ('EUR','USD','GBP')),
 notes text not null default '' check(char_length(notes)<=4000),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(owner_id,id)
);
create table if not exists public.lb_lead_activities (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 lead_id uuid not null,
 type text not null check(type in ('note','call','email','meeting','status')),
 detail text not null check(char_length(trim(detail)) between 1 and 2000),
 created_at timestamptz not null default now(),
 foreign key (owner_id,lead_id) references public.lb_leads(owner_id,id) on delete cascade
);
create index if not exists lb_projects_owner_idx on public.lb_projects(owner_id,created_at desc);
create index if not exists lb_tasks_owner_project_idx on public.lb_tasks(owner_id,project_id);
create index if not exists lb_leads_owner_idx on public.lb_leads(owner_id,stage);
create index if not exists lb_lead_activities_owner_lead_idx on public.lb_lead_activities(owner_id,lead_id);
alter table public.lb_projects enable row level security;
alter table public.lb_tasks enable row level security;
alter table public.lb_leads enable row level security;
alter table public.lb_lead_activities enable row level security;
revoke all on public.lb_projects,public.lb_tasks,public.lb_leads,public.lb_lead_activities from anon;
grant select,insert,update,delete on public.lb_projects,public.lb_tasks,public.lb_leads,public.lb_lead_activities to authenticated;
create policy lb_projects_owner_select on public.lb_projects for select to authenticated using (owner_id=auth.uid());
create policy lb_projects_owner_insert on public.lb_projects for insert to authenticated with check (owner_id=auth.uid());
create policy lb_projects_owner_update on public.lb_projects for update to authenticated using (owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy lb_projects_owner_delete on public.lb_projects for delete to authenticated using (owner_id=auth.uid());
create policy lb_tasks_owner_select on public.lb_tasks for select to authenticated using (owner_id=auth.uid());
create policy lb_tasks_owner_insert on public.lb_tasks for insert to authenticated with check (owner_id=auth.uid());
create policy lb_tasks_owner_update on public.lb_tasks for update to authenticated using (owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy lb_tasks_owner_delete on public.lb_tasks for delete to authenticated using (owner_id=auth.uid());
create policy lb_leads_owner_select on public.lb_leads for select to authenticated using (owner_id=auth.uid());
create policy lb_leads_owner_insert on public.lb_leads for insert to authenticated with check (owner_id=auth.uid());
create policy lb_leads_owner_update on public.lb_leads for update to authenticated using (owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy lb_leads_owner_delete on public.lb_leads for delete to authenticated using (owner_id=auth.uid());
create policy lb_lead_activities_owner_select on public.lb_lead_activities for select to authenticated using(owner_id=auth.uid());
create policy lb_lead_activities_owner_insert on public.lb_lead_activities for insert to authenticated with check(owner_id=auth.uid());
create policy lb_lead_activities_owner_update on public.lb_lead_activities for update to authenticated using(owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy lb_lead_activities_owner_delete on public.lb_lead_activities for delete to authenticated using(owner_id=auth.uid());
-- Required pre-release: enforce same-owner client_id relationship; test both-auth-user isolation.
