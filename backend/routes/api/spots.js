// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User,Spot,SpotImage,Review,Booking,ReviewImage,sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { crossOriginResourcePolicy } = require('helmet');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/',async (req, res) => {

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
    delete spot.User
})

    res.json({Spots})
  }
);


router.get('/:spotId/reviews',async (req, res) => {

    let Reviews=await Review.findAll({
        include: [
        { model:User,attributes: ['id','firstName','lastName']},
        { model:ReviewImage,attributes: ['id','url']}
        ],
        where:{spotId:req.params.spotId}
    });

    res.json({Reviews})

});

router.get('/:spotId/bookings',restoreUser,async (req, res) => {

    const { user } = req;

    let currentSpot=await Spot.findByPk(req.params.spotId)

    if(user.id===currentSpot.ownerId){
        const bookings=await Review.findAll({
            include: [
            { model:User,attributes: ['id','firstName','lastName']},
            ],
            where:{spotId:req.params.spotId}
        });

        res.json({bookings})
        return
     }
        const bookings=await Booking.findAll({

            where:{spotId:req.params.spotId},
            attributes: ['spotId','startDate','endDate']
        });
        res.json({bookings})

});


router.get('/:spotId',async (req, res) => {

    let tempSpot=await Spot.findByPk(req.params.spotId,{
        include: [
            { model:Review },
            { model:SpotImage, attributes: ['id','url','preview']},
            { model:User,attributes: ['id','firstName','lastName']}
            ],
    });

    let oneSpot=tempSpot.toJSON();

    let result=0;
    oneSpot.Reviews.forEach(el=>{
        result+=el.stars
    })
    oneSpot.numReviews=oneSpot.Reviews.length
    oneSpot.avgRating=result/oneSpot.Reviews.length
    oneSpot.Owner=oneSpot.User


    delete oneSpot.Reviews
    delete oneSpot.User

    res.json(oneSpot)

});


router.put('/:spotId',async (req, res) => {

    const { address,city,state,country,lat,lng,name,description,price}=req.body

    let oneSpot=await Spot.findByPk(req.params.spotId);

    if(address){oneSpot.address=address}
    if(city){oneSpot.city=city}
    if(state){oneSpot.state=state}
    if(country){oneSpot.country=country}
    if(lat){oneSpot.lat=lat}
    if(lng){oneSpot.lng=lng}
    if(name){oneSpot.name=name}
    if(description){oneSpot.description=description}
    if(price){oneSpot.price=price}

    res.json(oneSpot)

});



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

    const newBooking=await spot.createBooking({
        startDate,
        endDate,
        userId:user.id
    })

    res.json(newBooking)
  }
);

router.delete('/:spotId',restoreUser, async (req, res) => {
    const { user } = req;

    const oneSpot=await Spot.findByPk(req.params.spotId);

    oneSpot.destroy(),

    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
  );

module.exports = router;
