'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {

     options.tableName = "SpotImages";
     await queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
       preview:true
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        preview:true
       },
       {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        preview:true
       }

  ], {});
  },

  async down (queryInterface, Sequelize) {

     options.tableName = "SpotImages";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['http://localhost/images/001.png', 'http://localhost/images/001.png', 'http://localhost/images/001.png'] }
     }, {});
  }
};
