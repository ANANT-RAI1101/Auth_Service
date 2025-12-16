'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role,{
        through:'User_Roles'
      })
    }
  }
  User.init({
    email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
      }
    }, 
    password:{
    type:DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [8, 100]
      }
    },
    isVerified:{
       type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    verificationToken:{
      type: DataTypes.STRING,
      allowNull: true
    }, 
    verificationTokenExpiry:{
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
   const encryptedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedPassword;
});
  return User;
};