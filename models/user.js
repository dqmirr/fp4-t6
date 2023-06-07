'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo,{foreignKey:"UserId"}),
      User.hasMany(models.SocialMedia,{foreignKey:"UserId"}),
      User.hasMany(models.Comment,{foreignKey:"UserId"})
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your full name'
        },
        notEmpty:{
          args: true,
          msg:"full name can't be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique!"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email'
        },
        notEmpty:{
          args: true,
          msg:"email can't be empty"
        },
        isEmail:{
          args:true,
          msg:"Please enter the correct email"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "username must be unique!"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your username'
        },
        notEmpty:{
          args: true,
          msg:"username can't be empty"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password'
        },
        notEmpty:{
          args: true,
          msg:"password can't be empty"
        }
      }
    },
    profile_image_url: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the url'
        },
        notEmpty:{
          args: true,
          msg:"image url can't be empty"
        },
        isUrl:{
          args: true,
          msg:"Please enter the correct url"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your age'
        },
        notEmpty:{
          args: true,
          msg:"age can't be empty"
        },
        isNumeric:{
          args: true,
          msg:"Please enter only number/integer"
        }
      }
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your phone number'
        },
        notEmpty:{
          args: true,
          msg:"phone number can't be empty"
        },
        isNumeric:{
          args: true,
          msg:"Please enter only number/integer"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user) => {
        const hashedPass = hashPassword(user.password)

        user.password = hashedPass
      }
    }
  });
  return User;
};