 const User = require("../models/user");
const authService=require("../services/authService")
 const {validationResult}=require("express-validator")
 

const login=async(req,res,next)=>{

    const {emailId,password}=req.body;
     
try{
     const errors=validationResult(req);

      if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
      }

     const result=await authService.login({emailId,password})

     res.cookie("token",result.token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:24*60*60*1000,
     })
    
     res.status(200).json({
    
        message:"login successfully",
        user:result.user,

     })

}catch(err){
    next(err)
}
    
}

const signup=async(req,res,next)=>{
    const {name,emailId,password}=req.body;

    console.log("controller 1:",req.body)

    try{

        const errors=validationResult(req);

      if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
      }

         const user=await authService.signup({name,emailId,password})
         return res.status(200).json({
            message:"signup successfully",
            user,
         })
    }catch(err){
        next(err)
    }
}

const logout=(req,res)=>{
    res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  })

    res.status(200).json({message:"logout successfully"})
}

const getProfile=async(req,res,next)=>{
    try{
     const user=await User.findById(req.user.userId).select("-password");
     console.log(user)

     if(!user){
        return res.status(404).json({
            message:"user not found"
        })
     }
     return res.status(200).json({
        message:"profile fetch successfully",
        user,
     })
    }catch(err){
        next(err)
    }
}
module.exports={
    login,signup,logout,getProfile
}