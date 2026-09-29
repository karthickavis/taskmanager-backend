const express=require("express")
const {createTask}=require("../controllers/taskController")
const authMiddleware=require("../middlewares/authMiddleware")
const taskValidated=require("../validators/taskValidator")

const taskRouter=express.Router()

taskRouter.post("/task",authMiddleware,taskValidated,createTask)

module.exports=taskRouter;
