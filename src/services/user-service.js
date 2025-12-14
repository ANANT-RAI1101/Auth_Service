const UserRepository = require("../repository/users-repository")


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
}

module.exports=UserService;