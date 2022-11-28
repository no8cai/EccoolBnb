'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Booking.init({
    startDate: {
      type:DataTypes.DATEONLY,
      validate:{
        isDate: true,
        isBefore(value){
          if(Date.parse(value)<Date.now()){
            throw new Error('date can not be in the past');
          }
        }
      }
    },
    endDate: {
      type:DataTypes.DATEONLY,
      validate:{
      isDate: true,
      isGreater(value){
        if(Date.parse(value)<Date.parse(this.startDate)){
          throw new Error('end date should after start date');
        }
      }
      }
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
