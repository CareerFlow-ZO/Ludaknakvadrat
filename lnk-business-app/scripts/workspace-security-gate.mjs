// Static release gate. Execute: node lnk-business-app/scripts/workspace-security-gate.mjs
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>readFileSync(join(root,p),'utf8');
const stage=read('workspace-secure-staging.html');
const m1=read('supabase/migrations/20261012_workspace_vnext_staging_only.sql');
const m2=read('supabase/migrations/20261012_workspace_modules_stage2_NOT_APPLIED.sql');
const core=['lb_projects','lb_tasks','lb_leads','lb_lead_activities'];
const extended=['lb_team_members','lb_team_channels','lb_team_messages','lb_portal_invites','lb_payment_events','lb_ai_usage'];
for(const t of core) {
 assert.match(m1,new RegExp('alter table public\\.'+t+' enable row level security','i'));
 assert.match(m1,new RegExp('create policy '+t+'_owner_select'));
 assert.match(m1,new RegExp('create policy '+t+'_owner_insert'));
 assert.match(m1,new RegExp('create policy '+t+'_owner_update'));
 assert.match(m1,new RegExp('create policy '+t+'_owner_delete'));
}
for(const t of extended) {
 assert.ok(m2.includes('public.'+t),t+' missing');
}
assert.ok(m2.includes('enable row level security'));
assert.ok(m2.includes('revoke all on public.%I from anon'));
assert.ok(m2.includes('owner_id = auth.uid()'));
assert.ok(m2.includes('foreign key (owner_id,invoice_draft_id)'));
assert.ok(m2.includes('lb_messages_owner_author_only'));
assert.ok(!m1.includes('client_id uuid references public.lb_clients'));
assert.ok(stage.includes('__STAGING_SUPABASE_URL__'));
assert.ok(stage.includes('__STAGING_SUPABASE_PUBLISHABLE_KEY__'));
assert.ok(stage.includes('Staging not configured'));
assert.ok(stage.includes('auth.getUser()'));
assert.ok(!stage.includes('sb_secret_'));
assert.ok(!stage.includes('service_role'));
assert.ok(!stage.includes('mwgnwbmssiyugwlsnotz'));
assert.ok(!stage.includes('checkout.sessions.create'));
console.log('Workspace static release gate passed; live tenant isolation remains UNTESTED.');
