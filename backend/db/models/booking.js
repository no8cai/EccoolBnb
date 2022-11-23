'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Booking.init({
    startDate: { 
      type:DataTypes.DATE,
      validate:{
        isDate: true,
        isGreater(value){
          if(Date.parse(value)<Date.now()){
            throw new Error();
          }
        }
      }
    },
    endDate: {
      type:DataTypes.DATE,
      validate:{
        isDate: true,
        isAfter: this.startDate,
      }
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};