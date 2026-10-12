import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const html=readFileSync(join(root,'workspace-secure-staging.html'),'utf8');
const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
assert.ok(scripts.length>0);
for(const script of scripts){const result=spawnSync(process.execPath,['--check','--input-type=module'],{input:script,encoding:'utf8'});assert.equal(result.status,0,result.stderr)}
for(const x of ['projectForm','taskForm','leadForm','invoiceForm','chatForm','inviteForm','aiForm'])assert.ok(html.includes('id="'+x+'"'),'Missing '+x);
assert.ok(html.includes('pdfqtjoshvavfowqlcdf.supabase.co'));
assert.ok(!html.includes('mwgnwbmssiyugwlsnotz'));
console.log('PASS staged UI JS syntax and seven forms');
