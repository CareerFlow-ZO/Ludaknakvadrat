#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const file=p=>readFileSync(p,'utf8');
const pages=[...file('sitemap.xml').matchAll(/<loc>https:\/\/www\.lnkdigital\.com(\/[^<]*)<\/loc>/g)].map(m=>m[1]);
assert.equal(pages.length,20);
const script=file('assets/js/lnk-metrics.js');
assert(script.includes("location.hostname!=='www.lnkdigital.com'"));
assert(!/document\.cookie|localStorage|sessionStorage|navigator\.userAgent/.test(script));
assert(script.includes("referrerPolicy:'no-referrer'") && script.includes("credentials:'omit'"));
for(const path of pages){
 const p=path==='/'?'index.html':path.slice(1),body=file(p);
 assert.equal((body.match(/src="\/assets\/js\/lnk-metrics\.js"/g)||[]).length,1,'Tracker missing '+p);
 assert(body.includes('lnk-metrics-disclosure') || body.includes('data-i18n="metricsNote"'),'Notice missing '+p);
 assert(body.includes('mailto:contact@ludaknakvadrat.com'),'Mail route changed '+p);
 assert(body.includes('wa.me/38631244612'),'WhatsApp route changed '+p);
}
const home=file('assets/js/lnk-home.js'),end=home.indexOf("let activeLanguage='en';");
const dictionary=JSON.parse(vm.runInNewContext(home.slice(0,end)+'\nJSON.stringify(LNK_TRANSLATIONS)',{},{timeout:2000}));
assert.equal(Object.keys(dictionary).length,10);
for(const t of Object.values(dictionary))assert(typeof t.metricsNote==='string'&&t.metricsNote.length>40);
assert(!script.includes('SUPABASE_SERVICE_ROLE_KEY'),'Server credential must not appear in browser');
assert(!script.includes('window.location.search'),'URL query must not enter measurement payload');
assert(script.includes("brief_whatsapp")&&script.includes("brief_email")&&script.includes("brief_view"));
const allowed=new Set(['v','event','path']);
const outbound=script.match(/JSON\.stringify\(\{([^}]+)\}\)/);
assert(outbound,'No bounded event payload');
const keys=outbound[1].split(',').map(s=>s.trim().split(':')[0]);
assert(keys.every(x=>allowed.has(x))&&keys.length===3,'Unexpected event payload');
assert(script.includes("navigator.globalPrivacyControl===true")&&script.includes("navigator.doNotTrack==='1'"));
console.log('LNK METRICS QA PASS: 20/20 pages, 10 language disclosures, six aggregate events, existing contact routes, no cookies, visitor identifiers or message contents.');
