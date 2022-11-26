'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "ReviewImages";
     await queryInterface.bulkInsert(options, [
      {
       reviewId: 1,
       url: 'http://localhost/images/ri001.png'
      },
      {
        reviewId: 2,
        url: 'http://localhost/images/ri002.png'
        
       },
       {
        reviewId: 3,
        url: 'http://localhost/images/ri003.png'
       }

  ], {});
  },

  async down (queryInterface, Sequelize) {
     options.tableName = "ReviewImages";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['http://localhost/images/ri001.png', 'http://localhost/images/ri002.png', 'http://localhost/images/ri003.png'] }
     }, {});
  }
};
