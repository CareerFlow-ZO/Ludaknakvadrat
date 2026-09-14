const Stripe = require("stripe");
const { supabase } = require("./_supabase");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PRICES = {
  BASIC: { amount: 1599, name: "Ludak Na Kvadrat — BASIC personalizovana pesma" },
  PREMIUM: { amount: 2999, name: "Ludak Na Kvadrat — PREMIUM personalizovana pesma" },
  VIP: { amount: 4999, name: "Ludak Na Kvadrat — VIP personalizovana pesma" }
};
function clean(value, max=1800) { return String(value ?? "").trim().slice(0,max); }

module.exports = async (req,res)=>{
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const {name,email,recipient,occasion,style,language,package:packageKey,story,mood,deadline}=req.body||{};
    if(!name||!email||!recipient||!occasion||!style||!language||!story||!packageKey)
      return res.status(400).json({error:"Nedostaju obavezni podaci."});
    const price=PRICES[packageKey];
    if(!price) return res.status(400).json({error:"Nepoznat paket."});

    const orderRows=await supabase("orders",{
      method:"POST",
      headers:{"Prefer":"return=representation"},
      body:JSON.stringify({
        name:clean(name,100),email:clean(email,160),recipient:clean(recipient,100),
        occasion:clean(occasion,100),style:clean(style,120),language:clean(language,60),
        package:packageKey,amount_cents:price.amount,currency:"eur",
        mood:clean(mood,80),deadline:clean(deadline,80),story:clean(story,1800),status:"pending"
      })
    });
    const order=orderRows?.[0];
    if(!order?.id) throw new Error("Narudžbina nije sačuvana.");

    const origin=process.env.PUBLIC_SITE_URL||`https://${req.headers.host}`;
    const session=await stripe.checkout.sessions.create({
      mode:"payment",
      customer_email:clean(email,160),
      line_items:[{price_data:{currency:"eur",product_data:{name:price.name,description:`${clean(recipient,80)} · ${clean(occasion,80)} · ${clean(style,100)}`},unit_amount:price.amount},quantity:1}],
      metadata:{order_id:order.id},
      success_url:`${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${origin}/index.html#naruci`,
      billing_address_collection:"auto",allow_promotion_codes:true,locale:"auto"
    });

    await supabase(`orders?id=eq.${encodeURIComponent(order.id)}`,{
      method:"PATCH",headers:{"Prefer":"return=minimal"},
      body:JSON.stringify({stripe_session_id:session.id})
    });

    return res.status(200).json({url:session.url});
  }catch(error){
    console.error(error);
    return res.status(500).json({error:"Plaćanje trenutno nije dostupno. Proveri podešavanja ili naruči preko WhatsApp-a."});
  }
};
