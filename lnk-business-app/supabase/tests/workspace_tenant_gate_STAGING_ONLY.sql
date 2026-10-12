-- LNK BUSINESS tenant isolation integration test: STAGING ONLY.
-- Run on a disposable Supabase DB AFTER both workspace migrations.
-- Never run on the existing shared production database.
begin;
do $$
declare
 a uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
 b uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
begin
 if (select count(*) from pg_tables where schemaname='public' and tablename in
 ('lb_projects','lb_tasks','lb_leads','lb_lead_activities','lb_team_members','lb_team_channels','lb_team_messages','lb_portal_invites','lb_payment_events','lb_ai_usage')) <> 10
 then raise exception 'Workspace migration incomplete'; end if;
 if exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relname in
 ('lb_projects','lb_tasks','lb_leads','lb_lead_activities','lb_team_members','lb_team_channels','lb_team_messages','lb_portal_invites','lb_payment_events','lb_ai_usage')
 and not c.relrowsecurity)
 then raise exception 'RLS missing on a workspace table'; end if;
 if exists(select 1 from information_schema.role_table_grants
 where table_schema='public' and grantee='anon' and table_name like 'lb_%'
 and table_name in ('lb_projects','lb_tasks','lb_leads','lb_lead_activities','lb_team_members','lb_team_channels','lb_team_messages','lb_portal_invites','lb_payment_events','lb_ai_usage'))
 then raise exception 'Anonymous role has workspace privileges'; end if;
end $$;
-- Automated functional tests must additionally create two synthetic auth.users
-- under an isolated test project, use separate authenticated JWTs, and confirm
-- that cross-tenant SELECT, INSERT, UPDATE and DELETE all fail.
rollback;
