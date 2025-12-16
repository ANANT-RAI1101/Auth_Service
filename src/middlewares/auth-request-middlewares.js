const validateUserAuth=async (req,res,next)=>{
    if(
        !req.body.email||
        !req.body.password
    )
    return res.status(400).json({
        message:"something went wrong",
        err:"email or password is missing",
        success:false,
    });
    next();
}

module.exports={
    validateUserAuth
}