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
        } catch (error) {
            
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
            
        }
    }
}

module.exports=UserRepository;