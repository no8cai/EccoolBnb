// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,Booking,sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { crossOriginResourcePolicy } = require('helmet');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/',async (req, res) => {

//   let Spots=await Spot.findAll({
//     include: [
//         { model:Review },
//         { model:SpotImage}
//             // [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'averagerate']
//     ],
    // attributes: [ "id","ownerId","address","city","state","country","lat","lng","name","description","price","createdAt","updatedAt","SpotImages.url"
    //     // [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'averagerate']
    // ],
//   });

//   let Spots=await Spot.findAll({
//     include: [
//         {model:SpotImage, attributes: ["url"]},{model:Review, attributes: ["stars"]}
//     ],
//   });
//   let Spots=await Spot.findAll()

//   for(let onespot of Spots){
//      let temp=await SpotImage.findOne({
//         where: {
//             spotId: onespot.id
//         }
//     })
//     console.log("url: "+temp.url)
//     console.log("output :"+onespot.id)
//     onespot.previewImage="bombombombom"
//   }
let allSpots=await Spot.findAll({
        include: [
        { model:Review },
        { model:SpotImage}
        ],
});

let Spots=[];
allSpots.forEach(spot=>{
    Spots.push(spot.toJSON())
})

Spots.forEach(spot=>{

    let result=0;
    spot.Reviews.forEach(el=>{
        result+=el.stars
    })
    spot.avgRating=result/spot.Reviews.length


    spot.SpotImages.forEach(image=>{
        if(image.preview===true){
            spot.previewImage=image.url
        }
    })
    
    delete spot.Reviews
    delete spot.SpotImages
    
})

  res.json({Spots});

});


router.get('/current',restoreUser,async (req, res) => {
    const { user } = req;

    let allSpots=await Spot.findAll({
        include: [
        { model:Review },
        { model:SpotImage},
        { model:User} 
        ],
        where:{ownerId:user.id}
    });

    res.json(allSpots)
  }
);

router.post('/',restoreUser,async (req, res) => {
    const { user } = req;
    
    const { address,city,state,country,lat,lng,name,description,price}=req.body
    
    const newSpot=await user.createSpot({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(newSpot)
  }
);

router.post('/:spotId/images',async (req, res) => {
    
    const { url,preview }=req.body
    
    const spot=await Spot.findByPk(req.params.spotId)
    const newSpotImage=await spot.createSpotImage({
        url,
        preview
    })

    res.json(newSpotImage)
  }
);

router.post('/:spotId/reviews',restoreUser, async (req, res) => {
    const { user } = req;
    const { review,stars }=req.body
    
    const spot=await Spot.findByPk(req.params.spotId)
    const newReview=await spot.createReview({
        review,
        stars,
        spotId:req.params.spotId,
        userId:user.id 
    })

    res.json(newReview)
  }
);

// Create and return a new booking from a spot specified by id.
router.post('/:spotId/bookings',restoreUser, async (req, res) => {
    const { user } = req;
    const { startDate,endDate }=req.body
    
    const spot=await Spot.findByPk(req.params.spotId);
    console.log(startDate,endDate,req.params.spotId,user.id);
    console.log(spot)

    const newBooking=await Booking.create({
        startDate:'2023-05-24',
        endDate:'2023-06-24',
        spotId:4,
        userId:1
    })

    res.json(newBooking)
  }
);

module.exports = router;