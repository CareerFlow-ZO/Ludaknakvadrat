const Stripe=require("stripe");
const CATALOG=Object.freeze({
 king:{name:"Golden King — Digital Art",cents:7900},
 earth:{name:"Beyond Earth — Digital Art",cents:7900},
 tree:{name:"Tree of Eternity — Digital Art",cents:19900}
});
module.exports=async(req,res)=>{
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 if(process.env.SHOP_SALES_ENABLED!=="true")return res.status(503).json({error:"Shop checkout is being prepared. No payment was taken."});
 if(!process.env.STRIPE_SECRET_KEY)return res.status(503).json({error:"Payment is not configured"});
 const origin=req.headers.origin;
 const allowed=["https://www.lnkdigital.com","https://lnkdigital.com"];
 if(origin&&!allowed.includes(origin)&&!/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin))return res.status(403).json({error:"Invalid origin"});
 const items=req.body?.items;
 if(!Array.isArray(items)||items.length<1||items.length>20)return res.status(400).json({error:"Invalid cart"});
 let quantity=0;
 for(const i of items){if(!i||typeof i.id!=="string"||!Object.hasOwn(CATALOG,i.id)||!Number.isInteger(i.quantity)||i.quantity<1||i.quantity>10)return res.status(400).json({error:"Invalid product or quantity"});quantity+=i.quantity;}
 if(quantity>30||new Set(items.map(i=>i.id)).size!==items.length)return res.status(400).json({error:"Invalid cart quantities"});
 try{
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const session=await stripe.checkout.sessions.create({
   mode:"payment",payment_method_types:["card"],
   line_items:items.map(i=>({price_data:{currency:"eur",product_data:{name:"LNK SHOP — "+CATALOG[i.id].name},unit_amount:CATALOG[i.id].cents},quantity:i.quantity})),
   billing_address_collection:"required",customer_creation:"always",
   metadata:{order_type:"lnk_shop",items:JSON.stringify(items)},
   success_url:"https://www.lnkdigital.com/shop/?payment=success&session_id={CHECKOUT_SESSION_ID}",
   cancel_url:"https://www.lnkdigital.com/shop/?payment=cancelled"
  });
  return res.status(200).json({url:session.url});
 }catch(e){console.error("Shop checkout failed",e?.code||e?.type||"unknown");return res.status(503).json({error:"Checkout temporarily unavailable"});}
};