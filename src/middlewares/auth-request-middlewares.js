const {StatusCodes}=require("http-status-codes")

const validateUserAuth=async (req,res,next)=>{
    if(
        !req.body.email||
        !req.body.password
    )
    return res.status(StatusCodes.BAD_REQUEST).json({
        message:"something went wrong",
        err:"email or password is missing",
        success:false,
    });
    next();
}

module.exports={
    validateUserAuth
}