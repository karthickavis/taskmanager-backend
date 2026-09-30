const mongoose = require("mongoose");
const Task =require("../models/task");
const taskValidated = require("../validators/taskValidator");

const createTask=async({title,description,status,priority,dueDate,userId})=>{

    const data={
        title,description,status,priority,dueDate,user:userId
    };

    const newTask= await Task.create(data)

    return newTask;

}
const getAllTask=async(userId,page=1,limit=10,status,priority)=>{

    page=Math.max(Number(page)||1,1);
    limit=Math.min(Math.max(Number(limit)||10,1),100);

    const skip=(page-1)*limit;

    const baseQuery={
        user:userId,
    }
    const taskQuery={
        ...baseQuery,
    }
    if(status){
        taskQuery.status=status;
    }
    if(priority){
        taskQuery.priority=priority;
    }


    const [tasks,totalTasks,completedTasks,uncompletedTasks] = await Promise.all([
        Task.find(taskQuery).sort({createdAt:-1}).skip(skip).limit(limit),
        Task.countDocuments(baseQuery),
        Task.countDocuments({
            user:userId,
            status:"completed"
        }),
        Task.countDocuments({
            user:userId,
            status:{
                $ne:"completed"
            }
        })
    ])

    const totalPages=Math.ceil(totalTasks/limit)
  
        return {
        tasks,

        pagination: {
            currentPage: page,
            limit,
            totalTasks,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        },

        statistics: {
            totalTasks,
            completedTasks,
            uncompletedTasks
        }
    };


}
const getSingleTask=async(taskId,userId)=>{

    if(!mongoose.Types.ObjectId.isValid(taskId)){
        throw new Error("invalid task id")
    }

    const task =await Task.findOne({
        _id:taskId,
        user:userId
    });

    if(!task){
        throw new Error('Task not  found');
    }
    return task;

}

const updateTask=async(taskId,userId,taskData)=>{

    const updatedTask=await Task.findOneAndUpdate(
        {
            _id:taskId,
            user:userId,
        },{
            $set:taskData
        },{
            new:true,
            runValidators:true
        }
    )
   
    if(!updatedTask){
        throw new Error("Task not found")
    }
    return updatedTask;

}

const deleteTask=async(taskId,userId)=>{

    const deletedTask=await Task.findOneAndDelete({
        _id:taskId,
        user:userId,
    })

    if(!deletedTask){
        throw new Error("task not found")
    }
    return deletedTask
}
module.exports={
    createTask,getAllTask,getSingleTask,updateTask,deleteTask
}