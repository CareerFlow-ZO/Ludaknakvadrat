// Run with: node lnk-business-app/scripts/existing-account-gate.mjs
// Verifies non-destructive same-account integration code; NOT a live two-user RLS test.
import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFileSync(join(root,name),'utf8');
const main=read('index.html');
const continuity=read('workspace-existing-account-compat.html');
const checks=[
  ['same Supabase project',()=>assert.ok(main.includes('mwgnwbmssiyugwlsnotz')&&continuity.includes('mwgnwbmssiyugwlsnotz'))],
  ['same public browser key',()=>{const rx=/sb_publishable_[A-Za-z0-9_-]+/;assert.equal(main.match(rx)?.[0],continuity.match(rx)?.[0])}],
  ['original login preserved',()=>assert.ok(main.includes('auth.signInWithPassword'))],
  ['original session persistence preserved',()=>assert.ok(main.includes('persistSession:true'))],
  ['continuity verifies user via getUser',()=>assert.ok(continuity.includes('auth.getUser()'))],
  ['continuity reuses existing login method',()=>assert.ok(continuity.includes('auth.signInWithPassword'))],
  ['owner restricted read',()=>assert.ok(continuity.includes(".eq('owner_id',user.id)"))],
  ['no database mutation in continuity checker',()=>assert.doesNotMatch(continuity,/\.insert\s*\(|\.update\s*\(|\.delete\s*\(|\.upsert\s*\(/)],
  ['no secret key in browser',()=>assert.doesNotMatch(continuity,/sb_secret_|service_role/)],
  ['no existing tables removed',()=>['lb_companies','lb_clients','lb_quotes','lb_appointments','lb_menu_items','lb_public_pages','lb_booking_requests'].forEach(t=>assert.ok(continuity.includes(t)))],
  ['existing app navigation includes continuity checker',()=>assert.ok(main.includes('/workspace-existing-account-compat.html'))]
];
for(const [name,check] of checks){check();console.log('PASS',name)}
console.log('All static account-continuity checks passed. Live sign-in, RLS and Vercel preview access MUST be tested separately.');
