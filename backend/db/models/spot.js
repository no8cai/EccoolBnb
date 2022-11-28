'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.SpotImage, {
          foreignKey: 'spotId', 
          onDelete: 'CASCADE', 
          hooks: true
      });
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(
        models.Booking, {
          foreignKey: 'spotId', 
          onDelete: 'CASCADE', 
          hooks: true
      });
      Spot.hasMany(
        models.Review, {
          foreignKey: 'spotId', 
          onDelete: 'CASCADE', 
          hooks: true
      });
    }
  }
  Spot.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type:DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};