const Stripe = require("stripe");
const PACKAGE = Object.freeze({START:{name:"START - spletna stran",cents:39900},BUSINESS:{name:"BUSINESS - spletna stran",cents:79900},PREMIUM:{name:"PREMIUM - spletna stran",cents:149900}});
const ADDONS = Object.freeze({qr:{name:"QR digitalni jedilnik",cents:24900},language:{name:"Dodatni jezik",cents:14900},google:{name:"Google Business Profile",cents:14900},seo:{name:"Naprednejši SEO pregled",cents:29900},ai:{name:"AI pomočnik (osnovni)",cents:39900}});
module.exports=async(req,res)=>{
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  if(!process.env.STRIPE_SECRET_KEY)return res.status(503).json({error:"Spletno plačilo še ni konfigurirano."});
  try{
    const {packageKey,addons,name,email,description,maintenance}=req.body||{};
    if(!Object.hasOwn(PACKAGE,packageKey)||!Array.isArray(addons)||addons.length>5||addons.some(k=>typeof k!=="string"||!Object.hasOwn(ADDONS,k))||new Set(addons).size!==addons.length)return res.status(400).json({error:"Neveljavna izbira paketa ali dodatkov."});
    if(typeof name!=="string"||name.trim().length<2||name.length>120||typeof email!=="string"||email.length>150||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof description!=="string"||description.length>1000||typeof maintenance!=="boolean")return res.status(400).json({error:"Preverite podatke obrazca."});
    const items=[PACKAGE[packageKey],...addons.map(k=>ADDONS[k])];
    const line_items=items.map(i=>({price_data:{currency:"eur",product_data:{name:"LNK DIGITAL — "+i.name},unit_amount:i.cents},quantity:1}));
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.create({
      mode:"payment",
      payment_method_types:["card"],
      customer_email:email.trim(),
      line_items,
      billing_address_collection:"required",
      automatic_tax:{enabled:true},
      tax_id_collection:{enabled:true},
      customer_creation:"always",
      invoice_creation:{enabled:true},
      client_reference_id:"lnk-digital-web",
      metadata:{order_type:"lnk_digital_service",package:packageKey,addons:addons.join(","),customer_name:name.trim().slice(0,120),project_description:description.slice(0,500),maintenance_requested:String(maintenance)},
      success_url:"https://www.lnkdigital.com/kalkulator/?payment=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url:"https://www.lnkdigital.com/kalkulator/?payment=cancelled",
      locale:"auto"
    });
    return res.status(200).json({url:session.url});
  }catch(err){console.error("LNK DIGITAL checkout failed:",err?.type||err?.code||"internal");return res.status(503).json({error:"Plačilo trenutno ni na voljo. Pošljite povpraševanje po e-pošti."})}
};