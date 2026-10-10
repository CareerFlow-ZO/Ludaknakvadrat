/* LNK BUSINESS aggregate page statistics. No tracking before opt-in.
   Stores only UTC date, route, and a random per-tab session UUID (no IP/name/cookie in DB).
   Counts page opens once per route/session/day, and only on production hostnames. */
import {createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.0/+esm";
(() => {
 "use strict";
 const route=location.pathname.replace(/\/+$/,"") || "/";
 const routes=new Set(["/","/paketi.html","/gastro-demo.html","/brezplacna-ponudba.html","/pomoc.html","/status.html","/rezervacija.html","/menu.html","/racuni.html","/racunovodstvo.html","/racun-podrobnosti.html","/placanje.html"]);
 const hosts=new Set(["lnk-business-saas.vercel.app","lnk-business-saas-ludak-na-kvadrat.vercel.app"]);
 if(!hosts.has(location.hostname)||!routes.has(route))return;
 const consentKey="lnk_business_analytics_consent_v1";
 const blocked=navigator.globalPrivacyControl===true||navigator.doNotTrack==="1"||window.doNotTrack==="1";
 const settings=document.getElementById("lb-analytics-settings");
 if(settings)settings.addEventListener("click",()=>{
   try{localStorage.removeItem(consentKey);location.reload()}catch{}
 });
 if(blocked)return;
 function capture(){
  try{
   const storage=sessionStorage;
   const day=new Date().toISOString().slice(0,10);
   const marker="lnk_business_seen_"+day+"_"+route;
   if(storage.getItem(marker)==="1")return;
   let sessionId=storage.getItem("lnk_business_session_id");
   if(!sessionId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sessionId)){
     sessionId=crypto.randomUUID();
     storage.setItem("lnk_business_session_id",sessionId);
   }
   const client=createClient("https://mwgnwbmssiyugwlsnotz.supabase.co","sb_publishable_HMb1ucc2gUu96nRPJVjb0Q_PqclMV3P",
    {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
   void client.from("lb_site_visits").insert({route,session_id:sessionId}).then(({error})=>{
     if(!error||error.code==="23505")storage.setItem(marker,"1");
   }).catch(()=>{});
  }catch(e){ /* no impact on the application */ }
 }
 let consent=null;
 try{consent=localStorage.getItem(consentKey)}catch{}
 if(consent==="yes")return capture();
 if(consent==="no")return;
 // A visible opt-in prevents non-essential sessionStorage access before consent.
 const english=(navigator.language||"").toLowerCase().startsWith("en");
 const panel=document.createElement("aside");
 panel.setAttribute("role","region");panel.setAttribute("aria-label",english?"Optional website analytics":"Neobvezno merjenje obiska");
 panel.style.cssText="position:fixed;z-index:2147483646;bottom:16px;left:16px;right:16px;max-width:520px;box-sizing:border-box;margin:auto;background:#15283e;color:#f4faff;border:1px solid #7594b0;border-radius:15px;box-shadow:0 8px 32px #000a;padding:15px;font:14px/1.5 system-ui,sans-serif";
 const p=document.createElement("p");p.style.cssText="margin:0 0 12px";p.textContent=english?
   "May we measure anonymous page sessions to improve LNK BUSINESS? Only the page path, UTC date and a temporary random session ID are stored. No advertising cookies or IP addresses in our analytics database.":
   "Ali dovoljujete anonimno merjenje obiska za izboljšanje LNK BUSINESS? Shranimo le pot strani, UTC datum in začasno naključno oznako seje. Brez oglaševalskih piškotkov in IP naslovov v naši zbirki.";
 const controls=document.createElement("div");controls.style.cssText="display:flex;gap:9px;flex-wrap:wrap;align-items:center";
 const link=document.createElement("a");link.href="/status.html";link.textContent=english?"Details":"Več informacij";link.style.cssText="color:#8ae9fa;margin-right:auto";
 const yes=document.createElement("button"),no=document.createElement("button");
 for(const button of [yes,no])button.style.cssText="font:inherit;border-radius:9px;border:1px solid #78a4bc;padding:8px 14px;cursor:pointer";
 yes.textContent=english?"Allow":"Dovoli";yes.style.background="#7de1f1";yes.style.color="#092034";
 no.textContent=english?"Decline":"Zavrni";no.style.background="#203850";no.style.color="#fff";
 function answer(choice){try{localStorage.setItem(consentKey,choice)}catch{}panel.remove();if(choice==="yes")capture()}
 yes.addEventListener("click",()=>answer("yes"));no.addEventListener("click",()=>answer("no"));
 controls.append(link,no,yes);panel.append(p,controls);document.body.append(panel);
})();
