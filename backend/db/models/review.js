'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
   
    static associate(models) {
      // define association here
      Review.hasMany(
        models.ReviewImage, {
          foreignKey: 'reviewId', 
          onDelete: 'CASCADE', 
          hooks: true
      });
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Review.init({
    review: DataTypes.STRING,
    stars: {
      type:DataTypes.INTEGER,
      validate:{
        min: 0,
        max: 5
      }
    },
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};