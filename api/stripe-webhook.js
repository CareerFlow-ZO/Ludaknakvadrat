const Stripe = require("stripe");
const { Resend } = require("resend");
const { supabase } = require("../_supabase");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports=async(req,res)=>{
  if(req.method!=="POST") return res.status(405).send("Method not allowed");
  let event;
  try{
    event=stripe.webhooks.constructEvent(req.body,req.headers["stripe-signature"],process.env.STRIPE_WEBHOOK_SECRET);
  }catch(err){
    console.error("Webhook signature error:",err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try{
    if(event.type==="checkout.session.completed"){
      const session=event.data.object;
      // LNK DIGITAL uses the same verified Stripe webhook, but keeps its orders
      // separate from the music catalogue. Never mark a service payment as a song.
      if(session.metadata?.order_type==="lnk_digital_service"){
        if(session.payment_status!=="paid"){
          return res.status(200).json({received:true,ignored:"payment not yet paid"});
        }
        if(!session.id||!["START","BUSINESS","PREMIUM"].includes(session.metadata.package)){
          console.error("LNK DIGITAL webhook: invalid signed session data");
          return res.status(400).json({error:"Invalid LNK DIGITAL session"});
        }
        const customer=session.customer_details||{};
        // Ignore duplicate deliveries; Stripe retries and can deliver out of order.
        await supabase("lnk_digital_service_orders?on_conflict=stripe_session_id",{
          method:"POST",
          headers:{"Prefer":"resolution=ignore-duplicates,return=minimal"},
          body:JSON.stringify({
            stripe_session_id:session.id,
            stripe_event_id:event.id,
            stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:null,
            customer_email:customer.email||session.customer_email||null,
            customer_name:session.metadata.customer_name||customer.name||null,
            package_key:session.metadata.package,
            addon_keys:session.metadata.addons||"",
            amount_total_cents:session.amount_total||0,
            currency:session.currency||"eur",
            payment_status:"paid",
            project_description:session.metadata.project_description||"",
            maintenance_requested:session.metadata.maintenance_requested==="true",
            paid_at:new Date((event.created||Math.floor(Date.now()/1000))*1000).toISOString()
          })
        });
        return res.status(200).json({received:true,service_order:true});
      }
      const orderId=session.metadata?.order_id;
      // This Stripe account also serves LNK BUSINESS. Ignore checkouts for other products.
      // A song order can only be fulfilled/emailed when it carries a music order_id.
      if(!orderId) return res.status(200).json({received:true,ignored:"unrelated checkout"});
      if(orderId){
        await supabase(`orders?id=eq.${encodeURIComponent(orderId)}`,{
          method:"PATCH",headers:{"Prefer":"return=minimal"},
          body:JSON.stringify({status:"paid",paid_at:new Date().toISOString(),stripe_session_id:session.id})
        });
      }

      const customerEmail=session.customer_details?.email||session.customer_email||"";
      const rows=orderId?await supabase(`orders?id=eq.${encodeURIComponent(orderId)}&select=*`):[];
      const o=rows?.[0]||{};
      const lines=[
        "🎵 NOVA PLAĆENA NARUDŽBINA — LUDAK NA KVADRAT","",
        `Kupac: ${o.name||"-"}`,`E-mail: ${customerEmail||o.email||"-"}`,
        `Pesma za: ${o.recipient||"-"}`,`Povod: ${o.occasion||"-"}`,
        `Stil: ${o.style||"-"}`,`Jezik: ${o.language||"-"}`,`Paket: ${o.package||"-"}`,
        `Atmosfera: ${o.mood||"-"}`,`Rok: ${o.deadline||"-"}`,"",
        "PRIČA / ŽELJE:",o.story||"-","",
        `Plaćeno: ${session.amount_total?(session.amount_total/100).toFixed(2)+" "+String(session.currency||"EUR").toUpperCase():"-"}`
      ];

      if(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM){
        const resend=new Resend(process.env.RESEND_API_KEY);
        if(customerEmail){
          const result=await resend.emails.send({
            from:process.env.EMAIL_FROM,
            to:[customerEmail],
            subject:"Ludak Na Kvadrat — uplata je primljena 🎵",
            text:`Hvala na narudžbini!\n\nUplata je uspešno primljena i tvoja narudžbina je sada u statusu „Plaćeno“.\n\nPaket: ${o.package||"-"}\nPesma za: ${o.recipient||"-"}\n\nLudak Na Kvadrat`
          });
          if(result.error) throw new Error(`Potvrda kupcu: ${result.error.message}`);
        }
        if(process.env.NOTIFICATION_EMAIL){
          const result=await resend.emails.send({
            from:process.env.EMAIL_FROM,
            to:[process.env.NOTIFICATION_EMAIL],
            subject:`💰 Plaćeno — ${o.recipient||"pesma"} — ${o.package||""}`,
            text:lines.join("\n")
          });
          if(result.error) throw new Error(`Obavijest vlasniku: ${result.error.message}`);
        }
      }else{
        console.error("Automatski e-mail nije podešen: potrebni su RESEND_API_KEY i verificirani EMAIL_FROM.");
      }
    }
  }catch(err){
    console.error("Webhook processing error:",err);
    return res.status(500).json({error:"Webhook processing failed"});
  }
  return res.status(200).json({received:true});
};
