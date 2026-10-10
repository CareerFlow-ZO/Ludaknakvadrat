/* LNK BUSINESS first-party aggregate page statistics (no cookies, no IP or personal details stored).
   This records one page open per browser tab session / page / UTC day.
   A random per-tab session ID is used only to count sessions, not to identify people. */
import {createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.0/+esm";
(() => {
  "use strict";
  const route=location.pathname.replace(/\/+$/,"") || "/";
  const allowed=new Set(["/","/paketi.html","/gastro-demo.html","/brezplacna-ponudba.html","/pomoc.html","/status.html","/rezervacija.html","/menu.html","/racuni.html","/racunovodstvo.html","/racun-podrobnosti.html","/placanje.html"]);
  const approvedHosts=new Set(["lnk-business-saas.vercel.app","lnk-business-saas-ludak-na-kvadrat.vercel.app"]);
  if(!approvedHosts.has(location.hostname) || !allowed.has(route))return;
  if(navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || window.doNotTrack === "1")return;
  try {
    if(localStorage.getItem("lnk_business_analytics_optout")==="1")return;
    const storage=window.sessionStorage;
    const date=new Date().toISOString().slice(0,10);
    const marker="lnk_business_seen_"+date+"_"+route;
    if(storage.getItem(marker)==="1")return;
    const sidKey="lnk_business_session_id";
    let sid=storage.getItem(sidKey);
    if(!sid || !/^[0-9a-f-]{36}$/i.test(sid)){sid=crypto.randomUUID();storage.setItem(sidKey,sid)}
    const client=createClient(
      "https://mwgnwbmssiyugwlsnotz.supabase.co",
      "sb_publishable_HMb1ucc2gUu96nRPJVjb0Q_PqclMV3P",
      {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}
    );
    void client.from("lb_site_visits").insert({route,session_id:sid}).then(({error})=>{
      if(!error || error.code==="23505")storage.setItem(marker,"1");
    }).catch(()=>{});
  } catch(e) { /* analytics must never interrupt application functionality */ }
})();