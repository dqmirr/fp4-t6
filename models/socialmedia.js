'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SocialMedia.belongsTo(models.User,{foreignKey:"UserId"})
    }
  }
  SocialMedia.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter social media name'
        },
        notEmpty:{
          args: true,
          msg:"social media name can't be empty"
        }
      }
    },
    social_media_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter social media url'
        },
        notEmpty:{
          args: true,
          msg:"social media url can't be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};