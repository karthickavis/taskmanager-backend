const express=require("express")
const {login,signup,logout,getProfile}=require("../controllers/authController")
const {validateLogin,validateSignup}=require("../validators/validator")
const authMiddleware=require("../middlewares/authMiddleware")

const authRouter=express.Router()



authRouter.post("/login",validateLogin,login)
authRouter.post("/signup",validateSignup,signup)
authRouter.post("/logout",logout)
authRouter.get("/getProfile",authMiddleware,getProfile)

module.exports=authRouter;