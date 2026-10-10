import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

const SITE = "https://lnk-business-saas.vercel.app";
const ORIGIN = SITE;
const cors = { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
const priceVars = { start: ["STRIPE_PRICE_START_MONTHLY", "STRIPE_PRICE_START_SETUP"], pro: ["STRIPE_PRICE_PRO_MONTHLY", "STRIPE_PRICE_PRO_SETUP"], gastro: ["STRIPE_PRICE_GASTRO_MONTHLY", "STRIPE_PRICE_GASTRO_SETUP"] };
function reply(status, body) { return new Response(JSON.stringify(body), {status, headers: {...cors, "Content-Type": "application/json", "Cache-Control": "no-store"}}); }
function config(){
 const mode = Deno.env.get("LB_PAYMENT_MODE");
 if(mode==="test"){
  const key=Deno.env.get("STRIPE_SECRET_KEY") || "";
  return key.startsWith("sk_test_")?{mode,key,prefix:"STRIPE_PRICE_"}:null;
 }
 if(mode==="live"){
  const key=Deno.env.get("STRIPE_LIVE_SECRET_KEY")||"";
  const allowed=Deno.env.get("LB_LIVE_BILLING_APPROVED")==="yes"
   &&Deno.env.get("LB_LIVE_TAX_READY")==="yes"
   &&Deno.env.get("LB_LIVE_TERMS_READY")==="yes";
  return allowed&&key.startsWith("sk_live_")?{mode,key,prefix:"STRIPE_LIVE_PRICE_"}:null;
 }
 return null;
}
async function stripeGet(path,key){
 const response=await fetch("https://api.stripe.com/v1/"+path,{headers:{"Authorization":"Bearer "+key}});
 const body=await response.json();
 if(!response.ok||body.error)throw Error(body.error?.message||"Stripe account check failed");
 return body;
}
async function stripe(path, params, key) {
 const body = new URLSearchParams(params);
 const res = await fetch("https://api.stripe.com/v1/" + path, {method:"POST", headers:{"Authorization":"Bearer "+key, "Content-Type":"application/x-www-form-urlencoded"}, body});
 const json = await res.json();
 if(!res.ok || json.error) throw Error(json.error?.message || "Stripe request failed");
 return json;
}
Deno.serve(async req => {
 if(req.method === "OPTIONS") return new Response(null, {status: 204,headers:cors});
 if(req.method !== "POST") return reply(405,{error:"POST only"});
 if(req.headers.get("origin") !== ORIGIN) return reply(403,{error:"Invalid origin"});
 const conf=config();
 if(!conf) return reply(503,{error:"Checkout is not activated for this merchant. Stripe keys and merchant approval are required."});
 const {key,mode}=conf;
 const anon=Deno.env.get("SUPABASE_ANON_KEY") || "";
 const url=Deno.env.get("SUPABASE_URL") || "";
 if(!anon || !url) return reply(503,{error:"Backend authentication is not configured."});
 const token=(req.headers.get("authorization") || "").replace(/^Bearer\s+/i,"");
 if(!token || token.length>5000) return reply(401,{error:"Log in first"});
 const db=createClient(url,anon,{auth:{autoRefreshToken:false,persistSession:false}});
 const {data:{user},error:authError}=await db.auth.getUser(token);
 if(authError || !user?.id || !user.email_confirmed_at) return reply(401,{error:"Verified account required"});
 try {
  const body=await req.json().catch(()=>null);
  if(!body || typeof body!=="object") return reply(400,{error:"Invalid request"});
  const action=body.action;
  const {data:billing,error:dbError}=await db.from("lb_billing_subscriptions") .select("plan,status,stripe_customer_id,stripe_subscription_id,livemode").eq("owner_id",user.id).maybeSingle();
  if(dbError) throw dbError;
  if(action==="portal"){
    if(!billing?.stripe_customer_id || billing.livemode!==(mode==="live")) return reply(400,{error:"No customer in the selected Stripe mode"});
    const portal=await stripe("billing_portal/sessions",{"customer":billing.stripe_customer_id,"return_url":SITE+"/placanje.html"},key);
    if(!portal.url?.startsWith("https://billing.stripe.com/")) return reply(502,{error:"Invalid Stripe portal URL"});
    return reply(200,{url:portal.url,mode});
  }
  if(action!=="checkout") return reply(400,{error:"Invalid billing action"});
  const plan=String(body.plan||"").toLowerCase();
  if(!Object.prototype.hasOwnProperty.call(priceVars,plan)) return reply(400,{error:"Unknown plan"});
  if(billing && billing.livemode===(mode==="live") && ["active","trialing","past_due","incomplete","unpaid"].includes(billing.status)) return reply(409,{error:"Existing subscription. Use the Stripe billing portal instead."});
  if(billing && billing.livemode!==(mode==="live") && ["active","trialing","past_due","incomplete","unpaid"].includes(billing.status)) return reply(409,{error:"An active subscription exists in the other Stripe mode. Reconcile it before switching."});
  const [monthlyVar,setupVar]=priceVars[plan];
  const priceKey=name=>mode==="live"?name.replace(/^STRIPE_PRICE_/,"STRIPE_LIVE_PRICE_"):name;
  const monthly=Deno.env.get(priceKey(monthlyVar))||"";
  const setup=Deno.env.get(priceKey(setupVar))||"";
  if(mode==="live"){
   const account=await stripeGet("account",key);
   if(!account.charges_enabled||!account.payouts_enabled||!account.details_submitted) return reply(503,{error:"Stripe live merchant verification or payouts are not enabled yet."});
  }
  if(!/^price_[A-Za-z0-9]+$/.test(monthly) || !/^price_[A-Za-z0-9]+$/.test(setup)) return reply(503,{error:"Stripe test prices are not configured for this plan."});
  const params={"mode":"subscription","success_url":SITE+"/placanje.html?result=success","cancel_url":SITE+"/placanje.html?result=cancel","client_reference_id":user.id,"metadata[owner_id]":user.id,"metadata[plan]":plan,
   "subscription_data[metadata][owner_id]":user.id,"subscription_data[metadata][plan]":plan,
   "line_items[0][price]":monthly,"line_items[0][quantity]":"1","line_items[1][price]":setup,"line_items[1][quantity]":"1",
   "billing_address_collection":"required","tax_id_collection[enabled]":"true"};
  if(mode==="live"){
    params["automatic_tax[enabled]"]="true";
    params["consent_collection[terms_of_service]"]="required";
    if(billing?.stripe_customer_id && billing.livemode===true)params["customer_update[address]"]="auto";
  }
  if(billing?.stripe_customer_id && billing.livemode===(mode==="live")) params["customer"]=billing.stripe_customer_id;
  else params["customer_email"]=user.email;
  const session=await stripe("checkout/sessions",params,key);
  if(!session.url?.startsWith("https://checkout.stripe.com/")) return reply(502,{error:"Invalid Stripe Checkout URL"});
  return reply(200,{url:session.url,mode});
 }catch(err){return reply(502,{error:"Billing temporarily unavailable: "+String(err?.message||err).slice(0,200)})}
});