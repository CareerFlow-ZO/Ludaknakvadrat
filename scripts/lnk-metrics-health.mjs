#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync('assets/js/lnk-metrics.js','utf8');
const key=src.match(/const PUBLIC_ANON_TOKEN="([^"]+)"/)?.[1];
assert(key&&key.startsWith('eyJ'),'Only the approved public Supabase anon token is used');
const endpoint='https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lnk-metrics';
const headers={Origin:'https://www.lnkdigital.com',Authorization:'Bearer '+key,apikey:key};
const response=await fetch(endpoint,{headers,signal:AbortSignal.timeout(25000)});
assert.equal(response.status,200,'Authenticated metrics health endpoint is not available');
const result=await response.json();
assert(result.ok===true&&result.scope==='lnk-daily-aggregate','Wrong metrics backend');
const preflight=await fetch(endpoint,{method:'OPTIONS',headers:{Origin:headers.Origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'authorization,apikey,content-type'},signal:AbortSignal.timeout(25000)});
assert([200,204].includes(preflight.status),'Browser preflight blocked: '+preflight.status);
assert.equal(preflight.headers.get('access-control-allow-origin'),headers.Origin,'CORS not restricted to expected LNK origin');
console.log('LNK METRICS HEALTH PASS: JWT-verified Supabase Edge function and browser preflight available, without writing false visit counts.');
