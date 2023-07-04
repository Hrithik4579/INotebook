var jwt=require('jsonwebtoken');
const JWT_SECRET="hbhagat123";
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "no existing user"})
}
    try{
    
const data=jwt.verify(token,JWT_SECRET);
req.user=data.user;
next();
    }catch(error){
        res.status(500).json({error: "some error occured"});
    }
}
module.exports=fetchuser;