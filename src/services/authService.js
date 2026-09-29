
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

 const login=async({emailId,password})=>{

   

    const user= await User.findOne({emailId})
  
    
  if (!user) {
    throw new Error("User not found");
  }

    const passwordCheck=await bcrypt.compare(password,user.password)


    if(!passwordCheck){
      throw new Error("password do not match")
    }

     const token=jwt.sign({
      userId:user._id,
      emailId:user.emailId,
    },process.env.JWT_SECRET,{
      expiresIn:"1d"
    })
   
  
    return {
      user,token
    };

 }

 const signup=async({name,emailId,password})=>{
    
  
    const user= await User.findOne({emailId})
   
    if(user){
      throw new Error("user already exits")
    }

    const hashedPassword= await bcrypt.hash(password,10)
 
    const newUser= await User.create({
      name,
      emailId,
      password:hashedPassword,
     
    })
    
    return newUser;
 }

 module.exports={
    login,signup
 }