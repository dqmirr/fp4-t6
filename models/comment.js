'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User,{foreignKey:"UserId"}),
      Comment.belongsTo(models.Photo,{foreignKey:"PhotoId"})
    }
  }
  Comment.init({
    UserId: DataTypes.INTEGER,
    PhotoId: DataTypes.INTEGER,
    comment: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your comment'
        },
        notEmpty:{
          args: true,
          msg:"comment can't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};