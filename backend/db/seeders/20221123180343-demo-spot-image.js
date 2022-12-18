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
       url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/ae22ea96-7858-4d5b-bb0c-17e3c8be1f62.jpeg?im_w=720',
       preview:true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/762a56a6-22d1-4f90-880e-359783640afa.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/96618dc7-dcfc-4c68-8479-6c0ff3294ee3.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/6912648a-7f67-4a99-a299-c0208b31e15b.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/0a9d76ad-d1ef-4c1d-b70e-2be241668986.jpeg?im_w=720',
        preview:true
       },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/68f481fd-3ab1-40e7-8180-1b3bf2cf4f57.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/9fcdd8ce-c7cd-4984-beaf-b2d4c0c60d8b.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/0ef2f2be-b641-4554-a7f2-e9bc8815bd55.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/2457f2f4-cff8-41b0-8718-a233380ab856.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/078457fb-977c-4bb1-8c37-e6b55408d71e.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        preview:true
       },
       {
        spotId: 4,
        url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/07/Avengers-Tower-Feature.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5',
        preview:true
       }

  ], {});
  },

  async down (queryInterface, Sequelize) {

     options.tableName = "SpotImages";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/ae22ea96-7858-4d5b-bb0c-17e3c8be1f62.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/762a56a6-22d1-4f90-880e-359783640afa.jpeg?im_w=720', 
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/96618dc7-dcfc-4c68-8479-6c0ff3294ee3.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/6912648a-7f67-4a99-a299-c0208b31e15b.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/0a9d76ad-d1ef-4c1d-b70e-2be241668986.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/68f481fd-3ab1-40e7-8180-1b3bf2cf4f57.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/9fcdd8ce-c7cd-4984-beaf-b2d4c0c60d8b.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/0ef2f2be-b641-4554-a7f2-e9bc8815bd55.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/2457f2f4-cff8-41b0-8718-a233380ab856.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/078457fb-977c-4bb1-8c37-e6b55408d71e.jpeg?im_w=720',
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/07/Avengers-Tower-Feature.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'
      ] }
     }, {});
  }
};
