const Stripe=require("stripe");
const {supabase}=require("../_supabase");
module.exports=async(req,res)=>{
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
 const params=new URL(req.url,"https://www.lnkdigital.com").searchParams;
 const id=params.get("session_id")||"";
 if(!/^cs_(live|test)_[A-Za-z0-9]{15,}$/.test(id))return res.status(400).json({error:"Invalid session"});
 if(!process.env.STRIPE_SECRET_KEY)return res.status(503).json({error:"Payment status unavailable"});
 try{
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const session=await stripe.checkout.sessions.retrieve(id);
  if(session.metadata?.order_type!=="lnk_digital_service"||!["START","BUSINESS","PREMIUM"].includes(session.metadata?.package))return res.status(404).json({error:"Not a service order"});
  const paid=session.payment_status==="paid";
  if(paid){
   const customer=session.customer_details||{};
   await supabase("lnk_digital_service_orders?on_conflict=stripe_session_id",{
     method:"POST",headers:{"Prefer":"resolution=ignore-duplicates,return=minimal"},
     body:JSON.stringify({
      stripe_session_id:session.id,stripe_event_id:"verified-session:"+session.id,
      stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:null,
      customer_email:customer.email||session.customer_email||null,
      customer_name:session.metadata.customer_name||customer.name||null,
      package_key:session.metadata.package,addon_keys:session.metadata.addons||"",
      amount_total_cents:session.amount_total||0,currency:session.currency||"eur",
      payment_status:"paid",project_description:session.metadata.project_description||"",
      maintenance_requested:session.metadata.maintenance_requested==="true",
      paid_at:new Date().toISOString()
     })
   });
  }
  return res.status(200).json({paid});
 }catch(err){console.error("LNK DIGITAL payment status verification:",err?.type||err?.code||"internal");
 return res.status(503).json({error:"Unable to confirm payment at this moment"});}
};