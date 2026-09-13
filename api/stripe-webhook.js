const Stripe = require("stripe");
const { Resend } = require("resend");
const const { supabase } = require("../_supabase");
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
      const orderId=session.metadata?.order_id;
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

      if(process.env.RESEND_API_KEY&&process.env.NOTIFICATION_EMAIL){
        const resend=new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from:process.env.EMAIL_FROM||"Ludak Na Kvadrat <onboarding@resend.dev>",
          to:[process.env.NOTIFICATION_EMAIL],
          subject:`💰 Plaćeno — ${o.recipient||"pesma"} — ${o.package||""}`,
          text:lines.join("\n")
        });
        if(customerEmail){
          await resend.emails.send({
            from:process.env.EMAIL_FROM||"Ludak Na Kvadrat <onboarding@resend.dev>",
            to:[customerEmail],
            subject:"Ludak Na Kvadrat — uplata je primljena 🎵",
            text:`Hvala na narudžbini!\n\nUplata je uspešno primljena i tvoja narudžbina je sada u statusu „Plaćeno“.\n\nPaket: ${o.package||"-"}\nPesma za: ${o.recipient||"-"}\n\nLudak Na Kvadrat`
          });
        }
      }
    }
  }catch(err){
    console.error("Webhook processing error:",err);
    return res.status(500).json({error:"Webhook processing failed"});
  }
  return res.status(200).json({received:true});
};
