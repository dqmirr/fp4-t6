'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User,{
        foreignKey:"UserId"
      })
      
      Photo.hasMany(models.Comment,{foreignKey:"PhotoId"})
    }
  }
  Photo.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter photo title'
        },
        notEmpty:{
          args: true,
          msg:"title can't be empty"
        }
      }
    },
    caption: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter caption'
        },
        notEmpty:{
          args: true,
          msg:"caption can't be empty"
        }
      }
    },
    poster_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter url'
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
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};