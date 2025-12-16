const express =require("express");
const UserController = require('../../controllers/user-controller');
const {AuthRequestMiddlewares}=require('../../middlewares/index')
const router=express.Router();

router.post('/signup', UserController.create);
router.post('/signIn',AuthRequestMiddlewares.validateUserAuth,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);
router.get('/isAdmin/:id',UserController.isAdmin);
router.get('/verify-email',UserController.verifyEmail);
router.delete('/delete/:id',UserController.destroy);

module.exports = router;

 