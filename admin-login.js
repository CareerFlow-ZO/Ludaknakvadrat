const { login } = require("./_admin-auth");
module.exports = async (req,res)=>{
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const password=String(req.body?.password||"");
  return login(req,res,password);
};
