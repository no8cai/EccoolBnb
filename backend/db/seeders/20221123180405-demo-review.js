'use strict';


const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const goodreview=[
  "We absolutely loved our stay at this charming and cozy cottage! The views of the meadow and rolling hills were breathtaking, and the house itself was beautifully decorated and immaculately clean. The host was incredibly helpful and accommodating, making our stay a truly memorable experience.",
  "We stayed at this stunning villa for our anniversary and couldn't have been happier with our choice. The ocean views were absolutely breathtaking, and the amenities were top-notch. The private infinity pool was the perfect spot to watch the sunset every evening. We would highly recommend this villa to anyone looking for a luxurious and unforgettable getaway.",
  "This beautiful riverfront house exceeded all of our expectations! The interior was spacious and well-appointed, with plenty of comfortable seating and beautiful decor. The outdoor deck and fire pit were the perfect spot to enjoy a glass of wine and watch the river flow by. We would definitely stay here again!",
  "We had the pleasure of staying at this magnificent manor for a family reunion, and it was truly an unforgettable experience. The house itself is grand and imposing, with beautifully appointed rooms and luxurious amenities. The surrounding gardens and grounds were simply stunning, and we all felt like royalty during our stay. Highly recommend!",
  "This cozy hilltop retreat was the perfect spot for a relaxing weekend getaway. The views were incredible, and the house itself was beautifully decorated and well-equipped with everything we needed. The host was incredibly responsive and accommodating, making our stay a truly enjoyable experience. We would definitely come back!",
  "We had an absolutely amazing stay at this charming and inviting cottage! The attention to detail in the decor and furnishings was truly impressive, and the location was perfect for exploring the surrounding area. The host was incredibly welcoming and accommodating, making our stay an unforgettable experience. Highly recommend!",
  "We recently stayed at this beautiful hillside villa and were blown away by the stunning views and luxurious amenities. The infinity pool and outdoor living space were the perfect spot to relax and take in the breathtaking scenery, and the interior of the house was beautifully decorated and well-appointed. We would definitely come back and stay here again!",
  "This riverfront home was the perfect spot for a peaceful and relaxing weekend getaway. The house itself was beautifully decorated and very comfortable, and the location was absolutely stunning. We enjoyed sitting on the deck and watching the river flow by, and the host was incredibly helpful and accommodating. We would highly recommend this home to anyone looking for a serene and beautiful retreat.",
  "Our stay at this elegant and opulent estate was truly unforgettable! The house itself was grand and imposing, with beautiful decor and luxurious amenities throughout. We especially enjoyed spending time in the stunning rose gardens and exploring the surrounding area. The host was incredibly welcoming and helpful, making our stay a truly memorable experience. Highly recommend!",
  "We had the pleasure of staying at this cozy and inviting cottage, and we couldn't have been happier with our experience. The location was perfect for exploring the surrounding countryside, and the house itself was beautifully decorated and well-equipped with everything we needed. The host was incredibly responsive and accommodating, making our stay a truly enjoyable experience. We would definitely come back and stay here again!"
]

const badreview=[
  "We were extremely disappointed with our stay at this house. The pictures online were misleading, as the house was much smaller and older than we expected. The furniture was old and uncomfortable, and the amenities were outdated. We were also disturbed by the noise from the street outside. Overall, we would not recommend this house.",
"Our stay at this house was a disaster. The house was not clean when we arrived, and the linens and towels were stained and had a bad smell. The plumbing was also not functioning properly, and there was a strange odor throughout the house. We contacted the host, but they were not responsive to our concerns. We would not recommend this house to anyone.",
"We found this house to be extremely overpriced for the quality of the accommodations. The house was poorly maintained and in need of updates and repairs. The furniture and decor were outdated and not comfortable, and the kitchen was poorly stocked. We also had issues with the plumbing and electricity during our stay. We would not recommend this house.",
"We were very disappointed with our stay at this house. The location was not as described, and the neighborhood was noisy and unsafe. The house itself was in poor condition, with peeling paint and old fixtures. The furniture was uncomfortable and the linens were worn and stained. We were also disappointed by the lack of amenities provided. We would not recommend this house.",
"Our experience at this house was a complete disaster. The house was infested with pests, including rodents and insects, and the odor was overwhelming. The furniture and decor were outdated and uncomfortable, and the appliances were old and in need of repairs. We were also disappointed by the lack of cleanliness throughout the house. We would not recommend this house to anyone.",
"We had an extremely unpleasant stay at this house. The house was dirty and poorly maintained, with a musty odor throughout. The furniture and decor were old and worn, and the linens and towels were stained and had a bad smell. We also experienced issues with the plumbing and electricity, and the host was not responsive to our concerns. We would not recommend this house.",
"Our stay at this house was a nightmare. The house was infested with pests, including roaches and mice, and the odor was overwhelming. The furniture and decor were outdated and uncomfortable, and the appliances were old and in need of repairs. The location was also not as described, and we felt unsafe in the neighborhood. We would not recommend this house to anyone.",
"We were extremely disappointed with our stay at this house. The house was not clean when we arrived, and there were food stains on the furniture and linens. The plumbing was also not functioning properly, and the water pressure was low. We also experienced issues with the heating and air conditioning, and the host was not responsive to our concerns. We would not recommend this house.",
"Our experience at this house was a complete disaster. The house was located on a busy street, and the noise was unbearable. The furniture and decor were outdated and uncomfortable, and the appliances were old and in need of repairs. We were also disappointed by the lack of cleanliness throughout the house. We would not recommend this house to anyone.",
"We had a terrible experience at this house. The house was not as described, and the photos online were misleading. The location was not convenient, and the neighborhood was unsafe. The furniture and decor were old and uncomfortable, and the linens were worn and stained. We also experienced issues with the plumbing and electricity, and the host was not responsive to our concerns. We would not recommend this house."
]


function reviewgenerator(spId,usId){
   
  let tempreview=""
  const tempstars=Math.floor(Math.random() * (5) + 1)

  if(tempstars>2){
    tempreview=goodreview[Math.floor(Math.random() * (goodreview.length))]
  }else{
    tempreview=badreview[Math.floor(Math.random() * (badreview.length))]
  }

  return {
    spotId: spId,
    userId: usId,
    review: tempreview,
    stars: tempstars
  }
}

function* generateReviews(){
  for(let spotId=1;spotId<=20;spotId++){
    for(let userId=1;userId<=14;userId++){
      yield reviewgenerator(spotId,userId)
    }
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
     options.tableName = "Reviews";
     await queryInterface.bulkInsert(options, [
      ...generateReviews()
      // {
      //  spotId: 2,
      //  userId: 1,
      //  review: 'Dont like this place at all, not recommanded to anyone',
      //  stars: 1
      // },      
      // {
      //   spotId: 3,
      //   userId: 2,
      //   review: 'This is an amazing place to stay! The hosts are very helpful and we’re amazing to work with!',
      //   stars: 5
      //  },
      //  {
      //   spotId: 4,
      //   userId: 3,
      //   review: 'Very responsive and available to help turn on the hot tub. Very much appreciate it and loved the place as well.',
      //   stars: 4
      //  },
      //  {
      //   spotId: 3,
      //   userId: 1,
      //   review: 'This property was awesome, and had plenty of places to hang out and enjoy time together! The pool and spa were in great shape.',
      //   stars: 5
      //  },
      //  {
      //   spotId: 1,
      //   userId: 2,
      //   review: 'Wonderful place with wonderful owners.',
      //   stars: 5
      //  }
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
