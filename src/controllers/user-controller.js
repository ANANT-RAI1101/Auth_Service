const UserService = require("../services/user-service")
const { StatusCodes } = require('http-status-codes')

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.OK).json({
            data: response,
            err: {},
            success: true,
            message: "user is created"
        })
    } catch (error) {
        console.log(error);               
        console.log(error.errors); 
        return res.status(error.statusCode).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}
const verifyEmail = async (req, res) => {
    try {
        const response = await userService.verifyEmail(req.query.token);
        return res.status(StatusCodes.OK).json({
            data: response,
            err: {},
            success: true,
            message: "email verified"
        });
    }
    catch (error) {
        return res.status(error.statusCode).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}
const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            err: {},
            success: true,
            message: "user is deleted"
        })
    } catch (error) {
        return res.status(error.statusCode).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}

const isAdmin=async (req,res)=>{
    try {
        const response=await userService.isAdmin(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            err: {},
            success: true,
            message: "he is admin"
        })
    } catch (error) {
        return res.status(500).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "user got signed in",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "user is authenticated",
            err: {}
        });
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
             message: error.message,
            success: false,
            data: {},
            err: error.explanation
        });
    }
}

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
    verifyEmail,
    isAdmin
}