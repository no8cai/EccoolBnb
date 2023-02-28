'use strict';

const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


const houselist=[
"Serenity House",
"Willow Tree Cottage",
"Blue Horizon Villa",
"Sunflower Lodge",
"Oakwood Manor",
"Sea Spray Retreat",
"Mountain View Lodge",
"Cherry Blossom House",
"Golden Crest Estate",
"Whispering Pines Retreat",
"Meadow View Cottage",
"Cedarwood Retreat",
"Riverfront Haven",
"Stonegate Manor",
"Sunset View Villa",
"Tranquil Oasis",
"Hilltop Retreat",
"Pinecrest Cottage",
"Misty Hollow Lodge",
"Rosewood Estate"
]

const descriptionlist=[
  "This peaceful retreat is tucked away in a quiet neighborhood, surrounded by lush greenery and blooming flowers. Step inside and feel the stress melt away as you take in the calming decor and cozy atmosphere.",
  "A charming and cozy abode, this cottage is nestled under the branches of a majestic willow tree. Enjoy the shade and tranquility of the surrounding garden, and take in the fresh air from the comfort of your front porch.",
  "Perched atop a hill, this sprawling villa offers breathtaking views of the rolling hills and sparkling blue waters in the distance. With plenty of indoor and outdoor living space, it's the perfect spot for entertaining or simply relaxing in style.",
  "This warm and inviting lodge boasts a rustic feel with all the modern amenities you need for a comfortable stay. Take in the beautiful sunflower fields just beyond the property as you unwind by the cozy fireplace.",
  "This grand and stately home features towering oak trees and manicured lawns that lead up to a grand entrance. Inside, you'll find elegant decor and luxurious amenities that will make you feel like royalty.",
  "With its beachy decor and ocean views, this retreat is the ultimate coastal escape. Listen to the waves from your private balcony and breathe in the fresh sea air as you soak up the sun.",
  "Escape to the mountains and take in the stunning views from every room of this cozy lodge. With plenty of outdoor space to explore and modern amenities to enjoy, it's the perfect retreat for nature lovers.",
  "This charming and whimsical house is surrounded by blooming cherry blossom trees, providing a serene and tranquil atmosphere. Step inside and take in the playful decor and cheerful ambiance.",
  "This majestic estate boasts stunning architecture and impeccable attention to detail. With its sweeping views, luxurious amenities, and elegant decor, it's the perfect spot for an unforgettable getaway.",
  "Whispering Pines Retreat: Tucked away in a peaceful forest, this cozy retreat offers a serene and secluded atmosphere. Listen to the rustling pines and take in the beauty of nature from the comfort of your private cabin.",
  "This charming cottage sits on a hill overlooking a serene meadow, with breathtaking views of rolling hills in the distance. Enjoy the peace and quiet of the countryside as you relax in this cozy retreat.",
  "Surrounded by towering cedar trees, this secluded retreat offers a peaceful escape from the hustle and bustle of everyday life. Take a stroll through the forest and breathe in the fresh, clean air.",
  "This spacious and inviting home sits on the banks of a peaceful river, offering serene water views from every room. Relax on the deck and listen to the soothing sounds of the water as you unwind.",
  "With its imposing stone facade and grand entrance, this magnificent manor exudes elegance and sophistication. Step inside and marvel at the stunning decor and luxurious amenities.",
  "Located on a hill overlooking a stunning sunset, this luxurious villa offers breathtaking views and unbeatable comfort. Take in the views from the comfort of your own private infinity pool.",
  "This cozy and serene house offers a peaceful respite from the chaos of everyday life. Nestled in a quiet neighborhood, it's the perfect spot to relax and recharge.",
  "This secluded retreat is perched atop a hill, offering stunning views of the surrounding landscape. With plenty of outdoor living space and modern amenities, it's the perfect spot for a quiet getaway.",
  "Surrounded by towering pine trees, this cozy cottage offers a peaceful and serene escape. Take a stroll through the forest and enjoy the clean, crisp air.",
  "This spacious and inviting lodge sits in a picturesque hollow, offering stunning views and unbeatable comfort. Relax by the fire and take in the beauty of your surroundings.",
  "With its stately architecture and beautiful rose gardens, this elegant estate is the epitome of sophistication. Step inside and be transported to a world of luxury and opulence."
]

function spotgenerator(idx){

  return {
    ownerId: Math.floor(Math.random() * (14) + 1),
    address: faker.address.streetAddress(),
    city: faker.address.cityName() ,
    state:faker.address.state(),
    country:'United States',
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    name: houselist[idx-1],
    description:descriptionlist[idx-1],
    price:faker.commerce.price()
  }
}

function* generateSpots(){
  for(let i =1;i<=20;i++){
      yield spotgenerator(i)
  }
}


module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Spots";
      await queryInterface.bulkInsert(options, [
        {
         ownerId: 1,
         address: '22001 Grand Cove Court',
         city:'Katy',
         state:'Texas',
         country:'United States',
         lat: 29.71799,
         lng: -95.76117,
         name: 'first demo house',
         description:'single house',
         price:600
        },
        {
          ownerId: 2,
          address: '12302 Seven Lake',
          city:'New York City',
          state:'New York',
          country:'United States',
          lat: 40.788709,
          lng: -74.45117,
          name: 'second demo house',
          description:'apartment',
          price:1000
         },
         {
          ownerId: 3,
          address: '5490 Cinco Ranch',
          city:'Los Angels',
          state:'California',
          country:'United States',
          lat: 33.92905,
          lng: -118.30328,
          name: 'third demo house',
          description:'condo',
          price:700
         },
         {
          ownerId: 1,
          address: '1001 Midtown Manhattan',
          city:'New York City',
          state:'New York',
          country:'United States',
          lat: 33.92905,
          lng: -118.30328,
          name: 'Stark Tower Complex',
          description:'Tower',
          price:900
         },
         ...generateSpots()
    ], {});
  },

  async down (queryInterface, Sequelize) {
     options.tableName = "Spots";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['22001 Grand Cove Court', '12302 Seven Lake', '5490 Cinco Ranch','1001 Midtown Manhattan'] }
     }, {});
  }
};
