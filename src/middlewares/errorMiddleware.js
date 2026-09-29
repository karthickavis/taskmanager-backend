

const errorMiddleware=(err,req,res,next)=>{

    console.log(err.stack)

    const statusCode=err.statusCode||500;

    res.status(statusCode).json({
        success:false,
        message:err.message || 'internal server error'
    });
};

module.exports=errorMiddleware;