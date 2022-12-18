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
       spotId: 2,
       userId: 1,
       review: 'Dont like this place at all, not recommanded to anyone',
       stars: 1
      },      
      {
        spotId: 3,
        userId: 2,
        review: 'This is an amazing place to stay! The hosts are very helpful and we’re amazing to work with!',
        stars: 5
       },
       {
        spotId: 4,
        userId: 3,
        review: 'Very responsive and available to help turn on the hot tub. Very much appreciate it and loved the place as well.',
        stars: 4
       },
       {
        spotId: 3,
        userId: 1,
        review: 'This property was awesome, and had plenty of places to hang out and enjoy time together! The pool and spa were in great shape.',
        stars: 5
       },
       {
        spotId: 1,
        userId: 2,
        review: 'Wonderful place with wonderful owners.',
        stars: 5
       }
  ], {});
  },

  async down (queryInterface, Sequelize) {
     options.tableName = "Reviews";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
     }, {});
  }
};
