const UserRepository = require("../repository/users-repository")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');


class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("error at service layer");
            throw error;    
        }
    }
    async destroy(userId){
        try {
            const response=await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            console.log("error at service layer");
            throw error;    
        }
    }

    async signIn(email,userPlainPassword){
        try{
            const user=await this.userRepository.getByEmail(email);
            const passwordMatch= this.comparePassword(userPlainPassword,user.password);

            if(!passwordMatch){
                console.log("password is wrong");
                throw {error: 'Incorrect password'};
            }

            const newJWT= this.createToken({email:user.email,id:user.id});
            return newJWT;
        }catch(error){
             console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token);
            if(!response){
                console.log("invalid token");   
            }
            const user= this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("error in creation of token");
            throw error;
        }

    }
    verifyToken(token){
        try {
            const response=jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("error in validation  of token");
            throw error;
        }
    }
    comparePassword(userPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userPlainPassword,encryptedPassword)
        } catch (error) {
            console.log("error in comparison  of password");
            throw error;
        }
    }
}

module.exports=UserService;