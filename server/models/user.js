'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo)
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          args: true,
          msg: 'Must be an Email'
        }
      },
      unique:true

    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg : 'Password must be filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(instance,opt){
        instance.password = hashPass(instance.password)
      }
    }
  });
  return User;
};