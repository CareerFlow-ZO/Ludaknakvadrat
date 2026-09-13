const { clearCookie } = require("./_admin-auth");
module.exports=async(req,res)=>{
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  clearCookie(res);
  return res.status(200).json({ok:true});
};
