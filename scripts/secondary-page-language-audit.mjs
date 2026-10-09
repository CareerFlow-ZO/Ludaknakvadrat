#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=readFileSync('sitemap.xml','utf8');
const pages=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(pages.length,20,'Expected 20 public LNK pages');
const langs=['en','sl','de','hr','bs','sr','it','fr','es','sq'];
const css='assets/css/lnk-global-languages.css';
assert(existsSync(css),'Missing responsive locale-menu stylesheet');
for(const url of pages){
 const path=new URL(url).pathname;
 if(path==='/')continue;
 const file=path.slice(1),html=readFileSync(file,'utf8');
 const originalLocale=html.match(/<html\b[^>]*lang="([^"]+)"/)?.[1];
 assert(originalLocale,'Missing original document language: '+file);
 assert(html.includes('<link rel="stylesheet" href="/assets/css/lnk-global-languages.css">'),'Missing locale-menu stylesheet on '+file);
 assert.equal((html.match(/<details class="lnk-global-languages">/g)||[]).length,1,'Language menu missing or duplicated on '+file);
 for(const lang of langs)
   assert(html.includes('<a href="/?lang='+lang+'" lang="'+lang+'">'),'Missing localized homepage link for '+lang+' on '+file);
 const localeMenu=html.match(/<details class="lnk-global-languages">[\s\S]*?<\/details>/);
 assert(localeMenu,'Missing localization menu boundaries on '+file);
 assert.equal((localeMenu[0].match(/href="\/\?lang=/g)||[]).length,langs.length,'Unexpected links inside language menu on '+file);
 // Marketing links may carry a validated ?lang= parameter without being part of the language menu.
 assert(html.includes('class="lnk-locale-note"'),'Missing clear homepage-only note on '+file);
 assert(html.includes('class="site-header"')&&html.includes('id="menuBtn"'),'Original menu changed on '+file);
 assert(html.includes('<link rel="canonical" href="'+url+'">'),'Canonical changed on '+file);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'Invalid H1 count on '+file);
 assert.equal((html.match(/<footer\b/g)||[]).length,1,'Missing footer on '+file);
}
const home=readFileSync('assets/js/lnk-home.js','utf8');
assert(home.includes("const requestedLocale=new URLSearchParams(location.search).get('lang');"),'Homepage must honor locale URLs');
assert(home.includes("Object.prototype.hasOwnProperty.call(LNK_TRANSLATIONS,requestedLocale)"),'Locale URLs must be validated');
console.log('LNK secondary locale QA PASS: 19 SEO pages, 10 language destinations, canonical URLs and existing document languages intact.');
