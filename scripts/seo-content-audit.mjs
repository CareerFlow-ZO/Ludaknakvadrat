#!/usr/bin/env node
// Regression coverage for LNK's contextual links and visible market-specific FAQ content.
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';

const origin='https://www.lnkdigital.com/';
const sitemap=readFileSync('sitemap.xml','utf8');
const targets=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(targets.length,20,'Expected 20 canonical LNK URLs');
const canonical=new Set(targets);
const filename=url=>url.replace(origin,'')||'index.html';
const html=new Map(targets.map(url=>{
 const path=filename(url);
 assert(existsSync(path),'Missing canonical page '+path);
 return[path,readFileSync(path,'utf8')];
}));
const expected={
 'index.html':[['restaurant-website-design.html','en'],['hotel-website-design.html','en'],['construction-company-website-design.html','en'],['izdelava-spletnih-trgovin.html','sl']],
 'web-design.html':[['auto-repair-website-design.html','en'],['izdelava-spletnih-trgovin.html','sl']],
 'izdelava-spletnih-strani.html':[['restaurant-website-design.html','en'],['web-design-germany.html','de-DE']],
 'barbershop-website-design.html':[['small-business-website-design.html','en'],['izdelava-spletnih-strani.html','sl']],
 'auto-repair-website-design.html':[['small-business-website-design.html','en'],['construction-company-website-design.html','en']],
 'prenova-spletne-strani.html':[['website-redesign-services.html','en'],['web-design-germany.html','de-DE']],
 'izdelava-spletnih-trgovin.html':[['small-business-website-design.html','en'],['restaurant-website-design.html','en']],
 'izdelava-spletne-strani-cena.html':[['small-business-website-design.html','en'],['web-design-austria.html','de-AT']],
 'web-design-austria.html':[['web-design-germany.html','de-DE'],['web-design-switzerland.html','de-CH']],
 'web-design-germany.html':[['web-design-austria.html','de-AT'],['web-design-switzerland.html','de-CH']],
 'web-design-switzerland.html':[['restaurant-website-design.html','en'],['construction-company-website-design.html','en']],
 'web-design-croatia.html':[['izdelava-spletnih-strani.html','sl'],['web-design-italy.html','it']],
 'web-design-italy.html':[['web-design-croatia.html','hr'],['web-design-switzerland.html','de-CH']],
 'web-design-usa.html':[['hotel-website-design.html','en'],['auto-repair-website-design.html','en']],
 'restaurant-website-design.html':[['web-design-usa.html','en-US'],['web-design-italy.html','it']],
 'hotel-website-design.html':[['web-design-austria.html','de-AT'],['web-design-croatia.html','hr']],
 'construction-company-website-design.html':[['web-design-usa.html','en-US'],['web-design-switzerland.html','de-CH']],
 'small-business-website-design.html':[['barbershop-website-design.html','en'],['auto-repair-website-design.html','en']],
 'website-redesign-services.html':[['web-design-germany.html','de-DE'],['izdelava-spletnih-strani.html','sl']],
 'web-design-portfolio.html':[['web-design-usa.html','en-US'],['web-design-germany.html','de-DE'],['izdelava-spletnih-strani.html','sl']]
};
assert.deepEqual(new Set(Object.keys(expected)),new Set(html.keys()),'All 20 sitemap pages must be covered');
let checked=0,faqQuestions=0;
for(const [source,links] of Object.entries(expected)){
 const markup=html.get(source);
 assert.equal((markup.match(/<h1\b/gi)||[]).length,1,'Missing/duplicate H1 '+source);
 assert(markup.includes('</main>')&&markup.includes('<footer'),'Page structure changed '+source);
 for(const [target,locale] of links){
  const dest='/'+target;
  assert(source!==target,'Accidental self-link '+source);
  assert(canonical.has(origin+target),'Link is not canonical '+source+' -> '+dest);
  const label='href="'+dest+'" hreflang="'+locale+'"';
  const i=markup.indexOf(label);
  assert(i>=0,'Missing link or incorrect hreflang '+source+' -> '+dest);
  const aEnd=markup.indexOf('</a>',i);
  const aOpenEnd=markup.indexOf('>',i);
  const text=markup.slice(aOpenEnd+1,aEnd).trim();
  assert(aEnd>i&&aOpenEnd>i&&text&&!/^(learn more|click here|more)$/i.test(text),
   'Non-descriptive contextual anchor '+source+' -> '+dest);
  assert.equal(html.get(target).match(/<html\b[^>]*lang="([^"]+)"/i)?.[1],locale,
   'Destination language does not match hreflang '+dest);
  checked++;
 }
 const faq=[...markup.matchAll(/<details><summary>([^<]+)<\/summary><p>[\s\S]*?<\/p><\/details>/g)];
 if(['web-design.html','izdelava-spletnih-strani.html','web-design-germany.html','web-design-usa.html'].includes(source)){
  assert(faq.length>=7,'Incomplete market FAQ '+source+': '+faq.length);
  assert.equal(new Set(faq.map(m=>m[1])).size,faq.length,'Duplicate FAQ question '+source);
  faqQuestions+=faq.length;
 }
 assert(markup.includes('mailto:contact@ludaknakvadrat.com'),'Contact email removed on '+source);
}
const home=html.get('index.html');
for(const key of ['seoExploreLabel','seoExploreTitle','seoExploreIntro','seoExploreRestaurants','seoExploreHotels','seoExploreConstruction','seoExploreShops']){
 assert(home.includes('data-i18n="'+key+'"'),'Homepage translation hook absent: '+key);
}
assert(home.includes('class="section lnk-seo-explore"'),'Homepage industry links section missing');
assert.equal(checked,43,'Wrong contextual link count');
console.log('LNK CONTENT QA PASS: 20/20 pages, '+checked+' contextual links, four FAQ sections ('+faqQuestions+' Q&A entries), contact links preserved.');
