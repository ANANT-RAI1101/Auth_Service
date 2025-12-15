const express =require("express");
const UserController = require('../../controllers/user-controller');
const router=express.Router();

router.post('/signup', UserController.create);
router.post('/signIn',UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);
router.get('/verify-email',UserController.verifyEmail);
router.delete('/delete/:id',UserController.destroy);

module.exports = router;

 