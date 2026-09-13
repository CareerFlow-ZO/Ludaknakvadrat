const { requireAuth } = require("./_admin-auth");
const { supabase } = require("./_supabase");

module.exports=async(req,res)=>{
  if(!requireAuth(req,res)) return;
  try{
    if(req.method==="GET"){
      const data=await supabase("orders?select=*&order=created_at.desc&limit=300");
      return res.status(200).json({orders:data});
    }
    if(req.method==="PATCH"){
      const id=String(req.body?.id||"");
      const status=String(req.body?.status||"");
      const allowed=["pending","paid","in_progress","completed","cancelled"];
      if(!id||!allowed.includes(status)) return res.status(400).json({error:"Neispravni podaci."});
      const patch={status};
      if(status==="completed") patch.completed_at=new Date().toISOString();
      if(status!=="completed") patch.completed_at=null;
      const rows=await supabase(`orders?id=eq.${encodeURIComponent(id)}`,{
        method:"PATCH",headers:{"Prefer":"return=representation"},body:JSON.stringify(patch)
      });
      return res.status(200).json({order:rows?.[0]});
    }
    return res.status(405).json({error:"Method not allowed"});
  }catch(err){
    console.error(err);
    return res.status(500).json({error:"Greška baze podataka."});
  }
};
