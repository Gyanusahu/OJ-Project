const User=require('../models/User')
const getUser=async(req,res,next)=>{
    const email=req.email
    console.log(email)
    try{
     const findedUser=await User.findOne({email:email})
     res.status(200).json({message:'success',status:true,user:{name:findedUser.name,email:findedUser.email}})
    }catch(error){

    }
}
module.exports=getUser