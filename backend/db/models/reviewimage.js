'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
  
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' });
    }
  }
  ReviewImage.init({
    url: {
      type:DataTypes.STRING,
      unique:true
    },
    reviewId: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};