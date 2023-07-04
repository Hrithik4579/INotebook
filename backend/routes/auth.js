const express=require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User= require('../models/User');
const fetchuser=require('../middleware/fetchuser');
const router=express.Router();
const JWT_SECRET="hbhagat123";
//ROUTE: 1-creating user
router.post('/createuser',[
    body('email','enter a valid email').isEmail(),
    body('name','enter a valid name').isLength({ min: 5 }),
    body('password','enter a valid password').isLength({ min: 5 })
],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
}
try{
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"already existing email"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
    name: req.body.name,
    email: req.body.email,  
    password: secPass,
  })
  data={
    user:{
        id:user.id
    }
  }
  authToken = jwt.sign(data,JWT_SECRET);
  success=true;
  res.json({success,authToken});
}catch{
    res.status(500).send("some error occured");
}
})
//ROUTE: 2-user login
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').exists()
],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        //check for the existance of that particular user in db 
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"enter a valid email"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"enter a valid password"});
        }
        data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.send({success,authToken});
    }catch(error){
        res.status(500).json({error:"some error occured"});
    } 

})

//ROUTE: 3- getting user deatils
router.post('/getuser',fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
   const userId=await req.user.id;
   const user= await User.findById(userId).select("-password");
   res.send(user);
}catch(error){
    res.status(500).json({error:"some error occured"});
}
}
)
// .then(user => res.json(user)).catch(error=>res.json(error));
module.exports=router;