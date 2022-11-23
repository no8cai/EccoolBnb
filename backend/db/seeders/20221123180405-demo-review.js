'use strict';


const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Reviews";
     await queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       userId: 1,
       review: 'bad',
       stars: 1
      },      
      {
        spotId: 2,
        userId: 2,
        review: 'good',
        stars: 5
       },
       {
        spotId: 3,
        userId: 3,
        review: 'average',
        stars: 3
       }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     options.tableName = "Reviews";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
