const UserRepository = require("../repository/users-repository")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Role } = require('../models/index');
const { sendVerificationEmail } = require('../helper/mail-service');
const AppError = require("../helper/app-errors");
const ServiceError=require("../helper/service-error");


const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.getByEmail(data.email);
            console.log(user)
            if (user) {
                if (user.isVerified) {
                    throw new Error('Email already registered');
                }

                const token = crypto.randomBytes(32).toString('hex');
                await this.userRepository.update(user.id, {
                    verificationToken: token,
                    verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
                });
                const userRole=await Role.findByPk(2);
                await user.addRole(userRole)
                await sendVerificationEmail(data.email, token);
                return user;
            }
            const token = crypto.randomBytes(32).toString('hex');

            const result = await this.userRepository.create({
                ...data,
                verificationToken: token,
                verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });
            const userRole=await Role.findByPk(2);
            const USER = await this.userRepository.getByEmail(data.email);
            await USER.addRole(userRole)
            await sendVerificationEmail(data.email, token);
            return result;

        } catch (error) {
            if(error.name=="SequelizeValidationError"||error.name=="Repository Error"){
                throw error;
            }
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }

    async verifyEmail(token) {
        try {
            const user = await this.userRepository.getByToken(token);
            if (!user) {
                console.log("user is not verified");
            }
            if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
                throw new Error('Verification token expired');
            }
            const response = await this.userRepository.update(user.id, {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiry: null
            });
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }
    async destroy(userId) {
        try {
            const response = await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }

    async signIn(email, userPlainPassword) {
        try {

            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            if (!user.isVerified) {
                throw new Error("Please verify your email before logging in");
            }

            const passwordMatch = this.comparePassword(userPlainPassword, user.password);

            if (!passwordMatch) {
                console.log("password is wrong");
                throw { error: 'Incorrect password' };
            }

            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;

        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                console.log("invalid token");
            }
            const user = this.userRepository.getById(response.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return user.id;
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }
    async isAdmin(userId){
        try {
            const user=await this.userRepository.getById(userId);
            const userRole=await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            });
            return  user.hasRole(userRole);
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
            
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
             throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }

    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
             throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }
    comparePassword(userPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userPlainPassword, encryptedPassword)
        } catch (error) {
            throw new ServiceError(
                error.message,
                error.explanation,
                error.statusCode
            )
        }
    }
}

module.exports = UserService;