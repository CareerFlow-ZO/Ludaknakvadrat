/* LNK DIGITAL public lead intake. Stores contacts in a private RLS table only. */
const { supabase } = require("../_supabase");
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  if (!/^application\/json\b/i.test(req.headers["content-type"]||"")) return res.status(415).json({error:"JSON required"});
  if (Number(req.headers["content-length"]||0)>12000) return res.status(413).json({error:"Request too large"});
  // Browser submits to the same origin; a cross-site scripted submission is rejected.
  const origin=req.headers.origin;
  if (origin && !["https://www.lnkdigital.com","https://lnkdigital.com"].includes(origin)
      && !/^https:\/\/ludak-na-kvadrat-[a-z0-9-]+\.vercel\.app$/.test(origin))
    return res.status(403).json({error:"Invalid origin"});
  try {
    const data=(typeof req.body==="string"?JSON.parse(req.body):req.body)||{};
    if (data.website_hidden) return res.status(200).json({ok:true}); // honeypot: silently discard
    const {name,email,company,service,message,consent}=data;
    const clean=x=>typeof x==="string"?x.trim():"";
    const n=clean(name),e=clean(email).toLowerCase(),c=clean(company),s=clean(service),m=clean(message);
    if (!consent || n.length<2||n.length>120||e.length>150||e.length<5
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
        || c.length>130||s.length>100||m.length>1500)
      return res.status(400).json({error:"Check required fields"});
    const allowed=["website","redesign","ecommerce","seo","booking","other"];
    if (!allowed.includes(s)) return res.status(400).json({error:"Invalid service"});
    const dataToSave={name:n,email:e,company:c,service:s,message:m,status:"new",channel:"website"};
    const result=await supabase("lnk_digital_leads",{method:"POST",headers:{"Prefer":"return=minimal"},body:JSON.stringify(dataToSave)});
    return res.status(201).json({ok:true});
  } catch (err) {
    console.error("LNK DIGITAL lead intake:",err?.message||"unknown error");
    return res.status(503).json({error:"We couldn't store your request. Please use WhatsApp or email."});
  }
};
