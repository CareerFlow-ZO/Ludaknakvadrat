#!/usr/bin/env node
// No-dependency conversion regression tests: copy, ten languages, safe mail/WhatsApp routing.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const read=path=>readFileSync(path,'utf8');
const html=read('index.html'),js=read('assets/js/lnk-brief.js'),sitemap=read('sitemap.xml');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,20,'Preserve all 20 public pages');
assert(html.includes('<script defer src="/assets/js/lnk-brief.js"></script>'),'Missing deferred brief script');
assert(html.includes('<section id="project-brief"'),'Homepage brief section missing');
assert(html.includes('data-brief-i18n="heroLink"'),'Hero visitor path missing');
assert(html.includes('data-brief-i18n="contactLink"'),'Existing contact visitor path missing');
assert(!/<form\b/i.test(html),'Brief must not post personal data via a form');
assert(!/\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\b|localStorage|sessionStorage/.test(js),
  'Brief must not post, persist or track visitor selections');
assert(!/innerHTML\s*=/.test(js),'No injection of arbitrary HTML into the brief');

const fieldInfo=[
 {id:'briefType',name:'type',values:['new','redesign','shop','booking','landing']},
 {id:'briefGoal',name:'goal',values:['leads','reservations','sales','trust']},
 {id:'briefMarket',name:'market',values:['slovenia','dach','europe','global']},
 {id:'briefTimeline',name:'timeline',values:['flexible','month','soon']}
];
for(const {id,name,values} of fieldInfo){
 const markup=html.match(new RegExp('<select id="'+id+'" data-brief-field="'+name+'">([\\s\\S]*?)<\\/select>'));
 assert(markup,'Missing input '+id);
 const actual=[...markup[1].matchAll(/<option value="([^"]+)" data-brief-i18n="([^"]+)"/g)];
 assert.deepEqual(actual.map(x=>x[1]),values,'Wrong choices for '+id);
 assert(actual.every(x=>x[1]===x[2]),'Option label translation key does not match choice');
 assert(html.includes('<label for="'+id+'"'),'Missing accessible label '+id);
}
const keysInMarkup=[...html.matchAll(/data-brief-i18n="([^"]+)"/g)].map(m=>m[1]);
const translationStart=js.indexOf('const KEYS=');
const translationEnd=js.indexOf("const section=document.getElementById('project-brief');");
assert(translationStart>=0&&translationEnd>translationStart,'Translation definition moved');
const translationText=js.slice(translationStart,translationEnd)+'\nJSON.stringify(TEXT)';
const translations=JSON.parse(vm.runInNewContext(translationText,{}, {timeout:4000}));
const languages=['en','sl','de','hr','bs','sr','it','fr','es','sq'];
assert.deepEqual(Object.keys(translations),languages,'Must support all ten LNK homepage languages');
const englishKeys=Object.keys(translations.en);
for(const lang of languages){
 const t=translations[lang];
 assert.deepEqual(Object.keys(t),englishKeys,'Incomplete translation dictionary: '+lang);
 for(const [key,value] of Object.entries(t))assert(typeof value==='string'&&value.trim(),'Empty translation '+lang+': '+key);
 for(const key of keysInMarkup)assert(t[key]&&t[key].trim(),'Untranslated brief HTML node '+lang+': '+key);
}
assert.equal(html.split('id="briefWhatsApp"').length-1,1,'Missing or repeated WhatsApp action');
assert.equal(html.split('id="briefEmail"').length-1,1,'Missing or repeated email action');
assert(html.includes('target="_blank" rel="noopener noreferrer"'),'Outbound WhatsApp link needs safe new-tab behavior');

const host='https://www.lnkdigital.com';
let linked=0;
for(const url of urls){
 if(url===host+'/')continue;
 const path=url.slice(host.length+1),body=read(path);
 const links=[...body.matchAll(/<a class="project-brief-footer-link" href="([^"]+)">([^<]+)<\/a>/g)];
 assert.equal(links.length,1,'Expected one localized brief link on '+path);
 const [_,encoded,label]=links[0];
 const href=encoded.replaceAll('&amp;','&'),link=new URL(href,host);
 assert.equal(link.origin,host,'Brief links may not leave the site');
 assert.equal(link.pathname,'/','Brief links must return to homepage');
 assert.equal(link.hash,'#project-brief','Wrong brief anchor on '+path);
 assert(languages.includes(link.searchParams.get('lang')),'Unknown language in '+path);
 assert(fieldInfo[0].values.includes(link.searchParams.get('service')),'Invalid project type in '+path);
 assert(label.length>12,'Unhelpful CTA label '+path);
 if(link.searchParams.has('goal'))assert(fieldInfo[1].values.includes(link.searchParams.get('goal')),'Invalid goal');
 assert(body.includes('mailto:contact@ludaknakvadrat.com'),'Existing mail route changed '+path);
 assert(body.includes('wa.me/38631244612'),'Existing WhatsApp changed '+path);
 linked++;
}
assert.equal(linked,19,'Expected all 19 additional sitemap pages to link to brief');

// Emulate browser wiring and language/selector interactions without real network access.
class Element {
 constructor(value=''){this.value=value;this.textContent='';this.href='';this.listeners={};this.attrs={};}
 addEventListener(type,fn){this.listeners[type]=fn;}
 fire(type='change'){if(this.listeners[type])this.listeners[type]();}
 getAttribute(key){return this.attrs[key]??null;}
}
const nodes=keysInMarkup.map(key=>{const e=new Element();e.attrs['data-brief-i18n']=key;return e;});
const ids={
 'project-brief':new Element(),'languageSelect':new Element('sl'),
 'briefType':new Element('new'),'briefGoal':new Element('leads'),
 'briefMarket':new Element('slovenia'),'briefTimeline':new Element('flexible'),
 'briefPreview':new Element(),'briefWhatsApp':new Element(),'briefEmail':new Element()
};
const document={
 getElementById(key){assert(Object.hasOwn(ids,key),'Unknown id '+key);return ids[key];},
 querySelectorAll(selector){assert.equal(selector,'[data-brief-i18n]');return nodes;}
};
vm.runInNewContext(js,{document,location:{search:'?lang=sl&service=shop&goal=sales'},
 URLSearchParams,encodeURIComponent},{timeout:4000});
assert.equal(ids.briefType.value,'shop','Deep-linked shop not preselected');
assert.equal(ids.briefGoal.value,'sales','Deep-linked sales goal not preselected');
const safeWhatsApp='https://wa.me/38631244612',safeEmail='contact@ludaknakvadrat.com';
function validateMessage(expectedLang){
 const message=new URL(ids.briefWhatsApp.href).searchParams.get('text');
 assert(ids.briefWhatsApp.href.startsWith(safeWhatsApp+'?text='),'Unexpected WhatsApp recipient');
 assert.equal(message,ids.briefPreview.textContent,'Preview must equal outbound WhatsApp message');
 assert(message.includes(translations[expectedLang].messageTitle),'Wrong outbound language: '+expectedLang);
 assert(message.includes('\n'),'Brief message must have real line breaks');
 assert(message.includes(translations[expectedLang][ids.briefType.value]),'Wrong selected project in outbound message');
 assert(message.includes(translations[expectedLang][ids.briefGoal.value]),'Wrong selected goal in outbound message');
 const email=new URL(ids.briefEmail.href);
 assert.equal(email.protocol,'mailto:','Email must use mailto: only');
 assert.equal(email.pathname,safeEmail,'Unexpected email recipient');
 assert.equal(email.searchParams.get('body'),message,'Email draft differs from WhatsApp draft');
 assert(email.searchParams.get('subject').startsWith('LNK DIGITAL'),'Business name missing from email subject');
}
validateMessage('sl');
for(const lang of languages){
 ids.languageSelect.value=lang;ids.languageSelect.fire();
 validateMessage(lang);
 for(const node of nodes)assert(node.textContent===translations[lang][node.getAttribute('data-brief-i18n')],
   'Wrong UI translation '+lang);
}
ids.briefType.value='booking';ids.briefType.fire();validateMessage('sq');
ids.briefGoal.value='reservations';ids.briefGoal.fire();validateMessage('sq');
// Ensure malicious or unsupported query-string content is discarded, not interpolated.
const suspicious={...ids,type:new Element('new'),goal:new Element('leads'),market:new Element('slovenia'),timeline:new Element('flexible')};
const previous=ids.briefType.value,goodMessage=ids.briefPreview.textContent;
ids.briefType.value='javascript:alert(1)';ids.briefType.fire();
assert(!ids.briefPreview.textContent.includes('javascript:'),'Unsafe choice leaked to preview');
assert(ids.briefWhatsApp.href.startsWith(safeWhatsApp),'Unsafe choice changed WhatsApp URL');
ids.briefType.value=previous;ids.briefType.fire();
assert.equal(ids.briefPreview.textContent,goodMessage,'User selection did not recover');

console.log('CONVERSION QA PASS: 20 public LNK pages, 19 localized landing links, 10 languages, 4 independent choices, correct WhatsApp/email drafts, no automatic data collection.');
