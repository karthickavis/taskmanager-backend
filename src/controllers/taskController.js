 const taskService=require("../services/taskService")

const createTask=async(req,res,next)=>{
    try{
         const {title,description,status,priority,dueDate}=req.body;
         const userId=req.user.userId;

         const task= await taskService.createTask({title,description,status,priority,dueDate,userId})

         res.status(201).json({
            message:"task created successfully",
            task,
         })
    }catch(err){
        next(err)
    }

}

const getAllTask=async(req,res,next)=>{
    try{
        const userId=req.user.userId;

        const{page=1,limit=10,status,priority}=req.query;

        const tasks=await taskService.getAllTask(userId,page,limit,status,priority)

        res.status(200).json({
            message:"task fetched successfully",
           ...tasks,
        })
    }catch(err){
      next(err)
    }

}
const getSingleTask=async(req,res,next)=>{
    try{
       const {taskId}=req.params;
       const userId=req.user.userId;

       const task= await taskService.getSingleTask(taskId,userId)

       res.status(200).json({
        message:"task fetch successfully",
        task,
       })
    }catch(err){
        next(err)
    }
}

const updateTask=async(req,res,next)=>{
    try{
        
         const {taskId}=req.params;
         const userId=req.user.userId;
         const taskData=req.body;

         const updatedTask=await taskService.updateTask(taskId,userId,taskData)

        

         res.status(200).json({
            message:"update task successfully",
            updatedTask
         })

    }catch(err){
        next(err)
    }
}

const deleteTask=async(req,res,next)=>{

    try{
        const {taskId}=req.params;
        const userId=req.user.userId;

        const deleted=await taskService.deleteTask(taskId,userId)

        res.status(200).json({
            message:" Task deleted successfully",
            deleted
        })
    }catch(err){
        next(err)
    }

}
module.exports={
    createTask,getAllTask,getSingleTask,updateTask,deleteTask
}