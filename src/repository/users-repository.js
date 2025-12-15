const{User}=require("../models/index")

class UserRepository{

    async create(data){
        try {
            const user= await User.create(data);
            return user.email;
        } catch (error) {
            console.log("error at repository layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
            const response=await User.destroy({
                where:{  
                    id:userId
                }
            })
            throw response;
        } catch (error) {
            console.log("error at repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const response=await User.findByPk({
                where:{
                    id:userId
                }
            })
            return response;
        } catch (error) {
            console.log("error at repository layer");
            throw error;
        }
    }
    async getByToken(token){
        try {
            const response=await User.findOne({
                where:{
                    verificationToken:token
                }
            })
            return response;
        } catch (error) {
            console.log("error at repository layer here",error);
            throw error
        }
    }
    async getByEmail(userEmail){
        try {
            const response=await User.findOne({
                where:{
                    email:userEmail
                }
            })
            return response;
        } catch (error) {
            console.log("error at repository layer");
            throw error;
        }
    }
    async update(userId,data){
        try {
            const response=await User.update(data,{
                where:{
                    id:userId
                }
            })
            return response;
        } catch (error) {
            console.log("error at repository layer at update");
            throw error
        }
    }
}

module.exports=UserRepository;