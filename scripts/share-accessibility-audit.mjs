#!/usr/bin/env node
// LNK DIGITAL shared-card and keyboard-navigation regression test.
// The host serves several clients: inspect only the twenty LNK sitemap pages.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const host='https://www.lnkdigital.com';
const asset=host+'/lnk-digital-logo.jpg';
const sitemap=readFileSync('sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,20,'Expected 20 public LNK URLs');
assert(existsSync('lnk-digital-logo.jpg'),'Social preview asset missing');
const jpeg=readFileSync('lnk-digital-logo.jpg');
assert(jpeg.length>1000 && jpeg[0]===255 && jpeg[1]===216 && jpeg[2]===255,
  'Social preview is not a valid JPEG asset');

function meta(markup,attribute,name){
  const tags=[...markup.matchAll(/<meta\b[^>]*>/gi)]
    .map(m=>m[0])
    .filter(s=>s.includes(attribute+'="'+name+'"'));
  assert.equal(tags.length,1,'Expected one '+name+' '+attribute+' entry');
  return tags[0].match(/\bcontent="([^"]+)"/i)?.[1];
}
let links=0;
for(const url of urls){
 const file=url===host+'/'?'index.html':url.slice(host.length+1);
 const markup=readFileSync(file,'utf8');
 const head=markup.slice(0,markup.indexOf('</head>'));
 const canonical=markup.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
 assert.equal(canonical,url,'Canonical changed '+file);
 for(const key of ['og:type','og:title','og:description','og:url','og:image','og:image:alt']){
   const val=meta(head,'property',key);
   assert(val&&val.trim(),'Empty social metadata '+file+' '+key);
 }
 assert.equal(meta(head,'property','og:url'),url,'Social URL differs from canonical '+file);
 assert.equal(meta(head,'property','og:image'),asset,'Unapproved OG image '+file);
 assert.equal(meta(head,'property','og:image:alt'),'LNK DIGITAL logo','Unverified OG image description '+file);
 for(const key of ['twitter:card','twitter:title','twitter:description','twitter:image']){
   assert(meta(head,'name',key)?.trim(),'Missing social Twitter metadata '+file+' '+key);
 }
 assert.equal(meta(head,'name','twitter:image'),asset,'Twitter image must match site logo '+file);
 const card=meta(head,'name','twitter:card');
 assert(card==='summary'||card==='summary_large_image','Unsupported card type '+file);
 const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,new Set(ids).size,'Duplicate HTML ID '+file);
 const skip=markup.match(/<a\b[^>]*class="skip-link"[^>]*href="#([^"]+)"[^>]*>/i);
 assert(skip,'Missing keyboard skip link '+file);
 const destination=skip[1];
 assert(ids.includes(destination),'Skip destination missing '+file+' #'+destination);
 assert(new RegExp('<main\\b[^>]*\\bid="'+destination+'"').test(markup),
   'Skip target must be the main landmark '+file);
 assert(skip.index<markup.indexOf('<header'),'Skip link must precede header '+file);
 for(const m of markup.matchAll(/<a\b[^>]*href="#([^"]+)"/gi)){
   assert(ids.includes(m[1]),'Broken in-page link '+file+' #'+m[1]);
   links++;
 }
 assert.equal((markup.match(/<h1\b/gi)||[]).length,1,'Wrong H1 count '+file);
}
console.log('SHARE & A11Y QA PASS: '+urls.length+'/20 social cards with authentic brand JPEG; 20/20 keyboard skip links; '+links+' internal anchors resolved.');
