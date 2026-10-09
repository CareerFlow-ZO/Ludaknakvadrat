#!/usr/bin/env node
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const script=readFileSync('assets/js/lnk-metrics.js','utf8');
function simulate(host='www.lnkdigital.com',dnt=false){
 const calls=[],listeners={};
 const document={readyState:'complete',getElementById:()=>null,addEventListener:(name,fn)=>{listeners[name]=fn;}};
 const location={protocol:'https:',hostname:host,pathname:'/'};
 const navigator={globalPrivacyControl:false,doNotTrack:dnt?'1':'0'};
 const window={doNotTrack:'0'};
 const fetch=(url,options)=>{calls.push({url,options});return Promise.resolve({ok:true});};
 vm.runInNewContext(script,{document,location,navigator,window,fetch},{timeout:2000});
 const click=(id,href)=>{listeners.click?.({target:{closest:()=>({id,getAttribute:()=>href})}});};
 return{calls,click};
}
const x=simulate();
assert.equal(x.calls.length,1,'Exactly one homepage page-load event');
x.click('','https://wa.me/38631244612?text=example');
x.click('','mailto:contact@ludaknakvadrat.com');
x.click('briefWhatsApp','https://wa.me/38631244612?text=example');
x.click('briefEmail','mailto:contact@ludaknakvadrat.com');
assert.equal(x.calls.length,6,'Page plus contact clicks and first brief view');
const names=x.calls.map(item=>JSON.parse(item.options.body).event);
assert.equal(names.join(','),'page_view,other_whatsapp,other_email,brief_view,brief_whatsapp,brief_email');
for(const call of x.calls){
 const keys=Object.keys(JSON.parse(call.options.body));
 assert.equal(keys.sort().join(','),'event,path,v');
 assert.equal(call.options.credentials,'omit');
 assert.equal(call.options.referrerPolicy,'no-referrer');
 assert.equal(call.options.keepalive,true);
 assert(call.url.endsWith('/functions/v1/lnk-metrics'));
}
assert.equal(simulate('eurogurman.si').calls.length,0,'Do not track Euro Gurman');
assert.equal(simulate('www.ludaknakvadrat.com').calls.length,0,'Do not track music domain');
assert.equal(simulate('www.lnkdigital.com',true).calls.length,0,'Respect Do Not Track');
console.log('LNK METRICS BROWSER QA PASS: page load, brief impression, four contact handoffs, no extra payload, domain and DNT guards.');
