
const Task =require("../models/task")

const createTask=async({title,description,status,priority,dueDate,userId})=>{

    const data={
        title,description,status,priority,dueDate,user:userId
    };

    const newTask= await Task.create(data)

    return newTask;

}
module.exports={
    createTask
}