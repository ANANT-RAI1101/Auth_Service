const { User } = require("../models/index")
const AppError = require("../helper/app-errors");
const ValidationError = require("../helper/validation-error");
const { StatusCodes } = require('http-status-codes')

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user.email;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                "Repository Layer Error",
                "Cannot create user ",
                "there is some error in creating the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async destroy(userId) {
        try {
            const response = await User.destroy({
                where: {
                    id: userId
                }
            })
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "Nothing to delete",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot delete what requested ",
                "there is some error in deleting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getById(userId) {
        try {
            const response = await User.findOne({
                where: {
                    id: userId
                }
            })
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record doesn't exist",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in getting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async getByToken(token) {
        try {
            const response = await User.findOne({
                where: {
                    verificationToken: token
                }
            });
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record doesn't exist",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in getting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async getByEmail(userEmail) {
        try {
            return await User.findOne({
                where: {
                    email: userEmail
                }
            });
            
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in getting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async update(userId, data) {
        try {
            const [response] = await User.update(data, {
                where: {
                    id: userId
                }
            });
            if (response===0) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "Nothing to update",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot upadate what requested ",
                "there is some error in updating the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }


}

module.exports = UserRepository;