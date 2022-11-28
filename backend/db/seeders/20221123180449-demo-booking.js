'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {

     options.tableName = "Bookings";
     await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-01-24',
        endDate: '2023-02-24'
       }, 
       {
        spotId: 3,
        userId: 2,
        startDate: '2024-03-01',
        endDate: '2024-04-09'
       }, 
       {
        spotId: 1,
        userId: 3,
        startDate: '2023-11-13',
        endDate: '2023-12-15'
       }
  ], {});
  },

  async down (queryInterface, Sequelize) {

     options.tableName = "Bookings";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
