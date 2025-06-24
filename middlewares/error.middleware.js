const errorMiddleware=(err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    return res  
            .status(statuscode)
            .json({
                success:false,
                message:err.message || "Internal server problem",
                errors:err.errors || [],
                stack:process.env.NODE_ENV === "development" ? err.stack : undefined,
            });
};

export {errorMiddleware};