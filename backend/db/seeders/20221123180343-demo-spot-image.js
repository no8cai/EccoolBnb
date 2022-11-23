'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     options.tableName = "SpotImages";
     await queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'http://localhost/images/001.png',
       preview:true
      },
      {
        spotId: 2,
        url: 'http://localhost/images/002.png',
        preview:true
       },
       {
        spotId: 3,
        url: 'http://localhost/images/003.png',
        preview:true
       }

  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     options.tableName = "SpotImages";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['http://localhost/images/001.png', 'http://localhost/images/001.png', 'http://localhost/images/001.png'] }
     }, {});
  }
};
