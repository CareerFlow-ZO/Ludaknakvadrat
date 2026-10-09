#!/usr/bin/env node
// LNK DIGITAL: guard portfolio honesty and security basics without changing shared client hosts.
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const text=p=>readFileSync(p,'utf8');
const site='https://www.lnkdigital.com';
const sitemap=text('sitemap.xml');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,20,'Expected 20 public LNK pages');
const expectedEmail='contact@ludaknakvadrat.com';
const expectedWhatsApp='wa.me/38631244612';
let securityPages=0, externalNewTabLinks=0;
for(const url of urls){
  const path=url===site+'/'?'index.html':url.slice(site.length+1);
  assert(existsSync(path),'Sitemap contains missing page: '+path);
  const html=text(path);
  assert(html.includes('mailto:'+expectedEmail),'Existing contact email missing: '+path);
  assert(html.includes(expectedWhatsApp)||path==='web-design-portfolio.html' && html.includes(expectedWhatsApp),
    'Existing WhatsApp link missing: '+path);
  assert.equal((html.match(/<main\b/g)||[]).length,1,'Unexpected main element count: '+path);
  // External scripts / iframes can collect personal data without the owner knowing.
  for(const match of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)){
    const src=match[1];
    assert(src.startsWith('/assets/'), 'Unreviewed third-party script: '+path+' '+src);
  }
  assert(!/<iframe\b/i.test(html),'Unreviewed external iframe: '+path);
  for(const match of html.matchAll(/<a\b[^>]*\btarget=["']_blank["'][^>]*>/gi)){
    const tag=match[0];
    assert(/\brel=["'][^"']*\bnoopener\b/i.test(tag),'Missing noopener on external-tab link: '+path);
    externalNewTabLinks++;
  }
  // The current site has no web forms; any new one needs a privacy and anti-spam review.
  assert(!/<form\b/i.test(html),'A new form needs separate GDPR/security review: '+path);
  securityPages++;
}
const home=text('index.html'), portfolio=text('web-design-portfolio.html'), locale=text('assets/js/lnk-home.js');
assert(home.includes('<span data-i18n="secondaryCta">Explore design concepts</span>'),
 'Homepage must label illustrative designs accurately');
assert(portfolio.includes('illustrative design concepts, not verified client case studies'),
 'Portfolio must clearly distinguish concept art from verified project evidence');
assert(portfolio.includes('Verified case studies only') &&
       portfolio.includes('obtaining permission') &&
       portfolio.includes('We do not invent testimonials, ratings or customer counts'),
 'Missing portfolio case study verification standard');
const translations=[...locale.matchAll(/secondaryCta:"([^"]+)"/g)].map(m=>m[1]);
assert.equal(translations.length,10,'Every language must have a portfolio label');
assert(translations.every(label=>label.trim()!=='View design work'&&label.trim()!=='Oglejte si naše delo'),
 'Old, possibly misleading portfolio label still present');
assert(existsSync('docs/lnk-legal-privacy-readiness.md'),'Legal review checklist missing');
assert(!urls.some(u=>/privacy-policy|legal-notice|cookie-policy|terms/i.test(u)),
 'Unapproved legal policy added to sitemap');
assert(!/<a\b[^>]*href=["'][^"']*(privacy-policy|legal-notice|cookie-policy|terms)\.html/i.test(home+portfolio),
 'Unverified legal document linked as finished');
const vercel=JSON.parse(text('vercel.json'));
for(const section of ['headers','redirects','routes']) assert(Array.isArray(vercel[section]), 'Shared host routing missing: '+section);
assert(vercel.routes.some(r=>JSON.stringify(r).includes('eurogurman.si')),
 'Euro Gurman shared host route disappeared');
assert(vercel.headers.some(h=>h.source==='/admin.html' && h.headers.some(v=>v.key==='X-Robots-Tag' && /noindex/.test(v.value))),
 'Admin must remain noindex');
assert(vercel.headers.some(h=>h.source==='/euro-gurman-preview/(.*)' && h.headers.some(v=>v.key==='X-Robots-Tag' && /noindex/.test(v.value))),
 'Euro Gurman preview must remain noindex');
console.log('TRUST & SECURITY QA PASS: '+securityPages+'/20 LNK pages; no unreviewed external scripts/forms/iframes; '+externalNewTabLinks+' external-tab links checked; 10 honest portfolio labels; legal publication blocked pending business facts; client routes retained.');
