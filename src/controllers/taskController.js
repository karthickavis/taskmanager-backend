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
module.exports={
    createTask
}