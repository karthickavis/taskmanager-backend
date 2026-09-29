const express=require("express")
const cookieParser=require("cookie-parser")
const connectDB=require("./config/db")
const authRouter=require("./router/authRoutes")
const taskRouter=require("./router/taskRoutes")
const errorMiddleware=require("./middlewares/errorMiddleware")
const app=express()
require("dotenv").config()

app.use(express.json())
app.use(cookieParser())
app.use("/",authRouter)
app.use("/users",taskRouter)




app.use(errorMiddleware)

const startServer=async()=>{
    try{
        await connectDB()
        app.listen(process.env.PORT,()=>{
    console.log("server connected successfullly")
})
    }catch(err){
        console.log(err.message)
    }
}
startServer()


