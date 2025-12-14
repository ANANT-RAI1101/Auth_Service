const UserService = require("../services/user-service")

const userService = new UserService();

const create=async(req,res)=>{
    try {
        const response=await userService.create({
         email: req.body.email,
         password: req.body.password
    });
    return res.status(201).json({
        data:response,
        err:{},
        success:true,
        message:"user is created"
    })
    } catch (error) {
        return res.status(500).json({
            data:{},
            err:error.message,
            success:false,
            message:"user is not created"
        })
    }
}
const destroy=async(req,res)=>{
    try {
        const response=await userService.destroy(req.params.id);
    return res.status(20).json({
        data:response,
        err:{},
        success:true,
        message:"user is deleted"
    })
    } catch (error) {
        return res.status(500).json({
            data:{},
            err:{error},
            success:false,
            message:"user is not deleted"
        })
    }
}

module.exports={
    create,
    destroy
}