import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";

// Stripe calls this endpoint directly. JWT is off ONLY because the raw request must
// instead pass the signed Stripe-Signature timestamp + HMAC-SHA256 verification.
const encoder=new TextEncoder();
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const statuses=new Set(["incomplete","incomplete_expired","trialing","active","past_due","canceled","unpaid","paused"]);
const plans=new Set(["start","pro","gastro"]);
const json=(code, body)=>new Response(JSON.stringify(body),{status:code,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
function fromHex(s){if(!/^[0-9a-f]{64}$/i.test(s))return null;return Uint8Array.from(s.match(/../g),x=>parseInt(x,16))}
async function signatureValid(header, body, secret){
 if(!header||!secret.startsWith("whsec_"))return false;
 const t=(header.match(/(?:^|,)t=(\d+)(?:,|$)/)||[])[1];
 const signatures=[...header.matchAll(/(?:^|,)v1=([a-f0-9]{64})(?=,|$)/ig)].map(x=>fromHex(x[1]));
 const when=Number(t),now=Math.floor(Date.now()/1000);
 if(!Number.isSafeInteger(when)||Math.abs(now-when)>300||!signatures.length)return false;
 const hmac=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["verify"]);
 const signed=encoder.encode(t+"."+body);
 for(const candidate of signatures){if(candidate && await crypto.subtle.verify("HMAC",hmac,candidate,signed))return true}
 return false;
}
async function stripeRetrieve(id,key){
 const resp=await fetch("https://api.stripe.com/v1/subscriptions/"+encodeURIComponent(id),{headers:{"Authorization":"Bearer "+key}});
 const data=await resp.json();
 if(!resp.ok||data.error)throw Error(data.error?.message||"Unable to retrieve subscription");
 return data;
}
Deno.serve(async req=>{
 if(req.method!=="POST")return json(405,{error:"POST only"});
 const mode=Deno.env.get("LB_PAYMENT_MODE");
 const live=mode==="live";
 const approved=Deno.env.get("LB_LIVE_BILLING_APPROVED")==="yes"
    &&Deno.env.get("LB_LIVE_TAX_READY")==="yes"
    &&Deno.env.get("LB_LIVE_TERMS_READY")==="yes";
 const key=Deno.env.get(live?"STRIPE_LIVE_SECRET_KEY":"STRIPE_SECRET_KEY")||"";
 const secret=Deno.env.get(live?"STRIPE_LIVE_WEBHOOK_SECRET":"STRIPE_WEBHOOK_SECRET")||"";
 if(!((mode==="test"&&key.startsWith("sk_test_"))||(live&&approved&&key.startsWith("sk_live_")))||!secret.startsWith("whsec_"))return json(503,{error:"Webhook is disabled"});
 const raw=await req.text();
 if(raw.length>2000000)return json(413,{error:"Payload too large"});
 if(!await signatureValid(req.headers.get("stripe-signature"),raw,secret))return json(400,{error:"Invalid Stripe signature"});
 let event;
 try{event=JSON.parse(raw)}catch{return json(400,{error:"Invalid JSON"})}
 if(event.livemode!==live||typeof event.id!=="string"||!event.id.startsWith("evt_"))return json(400,{error:"Stripe event mode does not match configured key"});
 const db=createClient(Deno.env.get("SUPABASE_URL")||"",Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"",{auth:{autoRefreshToken:false,persistSession:false}});
 try{
  const {data:already,error:lookupError}=await db.from("lb_stripe_webhook_events").select("stripe_event_id").eq("stripe_event_id",event.id).maybeSingle();
  if(lookupError)throw lookupError;
  if(already)return json(200,{received:true,replayed:true});
  const typ=event.type||"",obj=event.data?.object||{};
  let sub=null,ownerId=null;
  if(typ==="checkout.session.completed" && obj.mode==="subscription"){
   if(typeof obj.subscription!=="string")throw Error("Checkout missing subscription ID");
   sub=await stripeRetrieve(obj.subscription,key);
  }else if(typ==="customer.subscription.created"||typ==="customer.subscription.updated"){
   if(typeof obj.id!=="string")throw Error("Missing subscription ID");
   sub=await stripeRetrieve(obj.id,key); // Always fetch newest Stripe state to avoid stale event ordering.
  }else if(typ==="customer.subscription.deleted"){
   sub=obj;
  }
  if(sub){
   ownerId=String(sub.metadata?.owner_id||"");
   const plan=String(sub.metadata?.plan||"");
   if(!uuid.test(ownerId)||!plans.has(plan)||!sub.id?.startsWith("sub_")||!sub.customer)throw Error("Subscription lacks verified owner/plan metadata");
   if(sub.livemode!==live)throw Error("Stripe subscription mode does not match configured key");
   const current=await db.from("lb_billing_subscriptions").select("stripe_subscription_id,status,livemode").eq("owner_id",ownerId).maybeSingle();
   if(current.error)throw current.error;
   if(current.data?.stripe_subscription_id && current.data.stripe_subscription_id!==sub.id && ["active","trialing","past_due","unpaid","incomplete"].includes(current.data.status)){
     throw Error("User has a different current subscription. Manual reconciliation required.");
   }
   const price=sub.items?.data?.[0]?.price?.id||null;
   const unix=Number(sub.current_period_end||sub.items?.data?.[0]?.current_period_end||0);
   const patch={owner_id:ownerId,plan,livemode:live,stripe_customer_id:typeof sub.customer==="string"?sub.customer:sub.customer.id,
     stripe_subscription_id:sub.id,stripe_price_id:price,
     status:statuses.has(sub.status)?sub.status:"inactive",
     cancel_at_period_end:!!sub.cancel_at_period_end,
     current_period_end:unix>0?new Date(unix*1000).toISOString():null,
     updated_at:new Date().toISOString()};
   const save=await db.from("lb_billing_subscriptions").upsert(patch,{onConflict:"owner_id"});
   if(save.error)throw save.error;
  }
  const recorded=await db.from("lb_stripe_webhook_events").insert({stripe_event_id:event.id,event_type:typ,owner_id:uuid.test(ownerId||"")?ownerId:null});
  if(recorded.error?.code!=="23505"&&recorded.error)throw recorded.error;
  return json(200,{received:true});
 }catch(err){
  console.error("LNK billing webhook processing failed",String(err?.message||err).slice(0,300));
  return json(500,{error:"Unable to process authenticated Stripe billing event"});
 }
});