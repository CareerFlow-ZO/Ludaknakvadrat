const Stripe=require("stripe");
const FILES=Object.freeze({king:"golden-king.svg",earth:"beyond-earth.svg",tree:"tree-eternity.svg"});
module.exports=async(req,res)=>{
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
 const id=req.query?.session_id,product=req.query?.product;
 if(typeof id!=="string"||!/^cs_(test|live)_[A-Za-z0-9]{15,}$/.test(id)||!Object.hasOwn(FILES,product))return res.status(400).json({error:"Invalid request"});
 if(!process.env.STRIPE_SECRET_KEY||!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)return res.status(503).json({error:"Downloads not configured"});
 try{
  const session=await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(id);
  const items=JSON.parse(session.metadata?.items||"[]");
  if(session.metadata?.order_type!=="lnk_shop"||session.payment_status!=="paid"||!Array.isArray(items)||!items.some(i=>i.id===product&&Number.isInteger(i.quantity)&&i.quantity>0))return res.status(403).json({error:"Paid purchase required"});
  const url=process.env.SUPABASE_URL.replace(/\/$/,"")+"/storage/v1/object/sign/lnk-shop-private/"+FILES[product];
  const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json",apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:"Bearer "+process.env.SUPABASE_SERVICE_ROLE_KEY},body:JSON.stringify({expiresIn:120,download:true})});
  if(!response.ok)throw Error("Private asset unavailable");
  const data=await response.json();
  if(typeof data.signedURL!=="string"||!data.signedURL.startsWith("/"))throw Error("Invalid storage response");
  return res.redirect(302,process.env.SUPABASE_URL.replace(/\/$/,"")+data.signedURL);
 }catch(e){console.error("Shop private download unavailable",e?.code||"unknown");return res.status(503).json({error:"Download unavailable. Please contact support."});}
};