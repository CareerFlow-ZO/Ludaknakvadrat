const Stripe=require("stripe");
const https=require("https");
const CATALOG={king:"golden-king",earth:"beyond-earth",tree:"tree-eternity"};
module.exports=async(req,res)=>{
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
 const id=req.query?.session_id,product=req.query?.product;
 if(typeof id!=="string"||!/^cs_(test|live)_[A-Za-z0-9]{15,}$/.test(id)||!Object.hasOwn(CATALOG,product))return res.status(400).json({error:"Invalid request"});
 if(!process.env.STRIPE_SECRET_KEY)return res.status(503).json({error:"Unavailable"});
 try{
  const session=await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(id);
  const items=JSON.parse(session.metadata?.items||"[]");
  if(session.metadata?.order_type!=="lnk_shop"||session.payment_status!=="paid"||!Array.isArray(items)||!items.some(i=>i.id===product&&i.quantity>0))return res.status(403).json({error:"Paid purchase required"});
  const file=CATALOG[product];
  const url="https://raw.githubusercontent.com/CareerFlow-ZO/Ludaknakvadrat/"+encodeURIComponent(process.env.SHOP_ASSET_COMMIT||"main")+"/shop/assets/"+file+".svg";
  const response=await fetch(url);
  if(!response.ok)throw Error("Asset unavailable");
  const svg=await response.text();
  if(!svg.startsWith("<svg"))throw Error("Invalid asset");
  res.setHeader("Content-Type","image/svg+xml");
  res.setHeader("Content-Disposition",'attachment; filename="'+file+'.svg"');
  return res.status(200).send(svg);
 }catch(e){console.error("Shop download unavailable",e?.code||"unknown");return res.status(503).json({error:"Download unavailable. Please contact support."});}
};