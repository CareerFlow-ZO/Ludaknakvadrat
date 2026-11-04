const Stripe=require("stripe");
module.exports=async(req,res)=>{
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
 const id=req.query?.session_id;
 if(typeof id!=="string"||!/^cs_(test|live)_[A-Za-z0-9]{15,}$/.test(id))return res.status(400).json({error:"Invalid session"});
 if(!process.env.STRIPE_SECRET_KEY)return res.status(503).json({error:"Unavailable"});
 try{
  const s=await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(id);
  if(s.metadata?.order_type!=="lnk_shop")return res.status(404).json({error:"Not a shop order"});
  return res.status(200).json({paid:s.payment_status==="paid",status:s.status,amount_total:s.amount_total,currency:s.currency});
 }catch(e){return res.status(404).json({error:"Order not found"});}
};