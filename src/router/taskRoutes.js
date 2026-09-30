const express=require("express")
const {createTask,getAllTask,getSingleTask,updateTask,deleteTask}=require("../controllers/taskController")
const authMiddleware=require("../middlewares/authMiddleware")
const taskValidated=require("../validators/taskValidator")

const taskRouter=express.Router()

taskRouter.post("/task",authMiddleware,taskValidated,createTask)
taskRouter.get("/task",authMiddleware,getAllTask)
taskRouter.get("/task/:taskId",authMiddleware,getSingleTask)
taskRouter.patch("/task/:taskId",authMiddleware,updateTask)
taskRouter.delete("/task/:taskId",authMiddleware,deleteTask)

module.exports=taskRouter;
