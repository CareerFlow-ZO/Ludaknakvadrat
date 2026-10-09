/* LNK DIGITAL: aggregate action counts, no cookies, per-person IDs, form contents or saved selections. */
(function(){
'use strict';
if(location.protocol!=='https:'||location.hostname!=='www.lnkdigital.com')return;
if(navigator.globalPrivacyControl===true||navigator.doNotTrack==='1'||window.doNotTrack==='1')return;
const API='https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lnk-metrics';
// This is Supabase's PUBLIC anon JWT, never a service-role/secret key. Database RLS denies anonymous access.
const PUBLIC_ANON_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Z253Ym1zc2l5dWd3bHNub3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMjQ0ODgsImV4cCI6MjEwNDkwMDQ4OH0.aSRpxKQOq5eDByJZdm8CvmgQ0JwgcsbXLrwq_6shJmA";
const PAGES=new Set(["/","/web-design.html","/izdelava-spletnih-strani.html","/barbershop-website-design.html","/auto-repair-website-design.html","/prenova-spletne-strani.html","/izdelava-spletnih-trgovin.html","/izdelava-spletne-strani-cena.html","/web-design-austria.html","/web-design-germany.html","/web-design-switzerland.html","/web-design-croatia.html","/web-design-italy.html","/web-design-usa.html","/restaurant-website-design.html","/hotel-website-design.html","/construction-company-website-design.html","/small-business-website-design.html","/website-redesign-services.html","/web-design-portfolio.html"]);
const PATH=location.pathname;
if(!PAGES.has(PATH))return;
const EVENT_TYPES=new Set(['page_view','brief_view','brief_whatsapp','brief_email','other_whatsapp','other_email']);
function count(event){
 if(!EVENT_TYPES.has(event))return;
 // Only these three bounded fields are transmitted; no IP, message content, referral URL or device identifier in the payload.
 const payload=JSON.stringify({v:1,event,path:PATH});
 try{fetch(API,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+PUBLIC_ANON_TOKEN,'apikey':PUBLIC_ANON_TOKEN},body:payload,mode:'cors',credentials:'omit',keepalive:true,referrerPolicy:'no-referrer'}).catch(()=>{});}catch(_e){}
}
function init(){
 count('page_view');
 let briefViewed=false;
 function markBrief(){if(!briefViewed){briefViewed=true;count('brief_view');}}
 const brief=document.getElementById('project-brief');
 if(brief&&'IntersectionObserver' in window){
  const watcher=new IntersectionObserver((entries)=>{if(entries.some(e=>e.isIntersecting)){markBrief();watcher.disconnect();}},{threshold:0.25});
  watcher.observe(brief);
 }
 document.addEventListener('click',(event)=>{
  const el=event.target;
  if(!el||typeof el.closest!=='function')return;
  const a=el.closest('a[href]');
  if(!a)return;
  const href=a.getAttribute('href')||'';
  if(href==='#project-brief'||href.includes('#project-brief'))markBrief();
  if(a.id==='briefWhatsApp'){markBrief();count('brief_whatsapp');return;}
  if(a.id==='briefEmail'){markBrief();count('brief_email');return;}
  if(href.startsWith('https://wa.me/38631244612'))count('other_whatsapp');
  else if(href.startsWith('mailto:contact@ludaknakvadrat.com'))count('other_email');
 },{capture:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
