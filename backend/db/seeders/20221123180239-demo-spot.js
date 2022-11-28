'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Spots";
      await queryInterface.bulkInsert(options, [
        {
         ownerId: 1,
         address: '22001 Grand Cove Court',
         city:'katy',
         state:'tx',
         country:'USA',
         lat: 29.71799,
         lng: -95.76117,
         name: 'first demo house',
         description:'single house',
         price:2000
        },
        {
          ownerId: 2,
          address: '22002 Seven Lake',
          city:'new york city',
          state:'ny',
          country:'USA',
          lat: 40.788709,
          lng: -74.45117,
          name: 'second demo house',
          description:'apartment',
          price:1000
         },
         {
          ownerId: 3,
          address: '22003 Cinco Ranch',
          city:'los angels',
          state:'ca',
          country:'USA',
          lat: 33.92905,
          lng: -118.30328,
          name: 'third demo house',
          description:'condo',
          price:1500
         }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     options.tableName = "Spots";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['22001 Grand Cove Court', '22002 Grand Cove Court', 'F22003 Grand Cove Court'] }
     }, {});
  }
};
