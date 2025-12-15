const UserService = require("../services/user-service")

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            err: {},
            success: true,
            message: "user is created"
        })
    } catch (error) {
        console.log(error);               
        console.log(error.errors); 
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "user is not created"
        })
    }
}
const verifyEmail = async (req, res) => {
    try {
        const response = await userService.verifyEmail(req.query.token);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: "email verified"
        });
    }
    catch (error) {
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "email not verified"
        })
    }
}
const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: "user is deleted"
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            err: { error },
            success: false,
            message: "user is not deleted"
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "user got signed in",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "user is not signed in",
            err: { error }
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "user is authenticated",
            err: {}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "user is not authenticated",
            err: {}
        });
    }
}

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
    verifyEmail
}