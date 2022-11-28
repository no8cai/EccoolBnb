// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const { User,Spot,SpotImage,Review,Booking,ReviewImage,sequelize } = require('../../db/models');
const { Op } = require("sequelize");
const { crossOriginResourcePolicy } = require('helmet');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validationResult } = require('express-validator');


const router = express.Router();



const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

const validateReviews = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({min:1,max:5})
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage("valid startDate is required"),
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage("valid endDate is required"),
    handleValidationErrors
  ];

const validateQuery = [
    check('page')
      .optional()
      .isInt({min:1,max:10})
      .withMessage("Page must be greater than or equal to 1"),
    check('size')
      .optional()
      .isInt({min:1,max:20})
      .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
      .optional()
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    check('minLng')
      .optional()
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .optional()
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
    check('minPrice')
      .optional()
      .isFloat({min:0})
      .withMessage("Maximum price must be greater than or equal to 0"),
    check('minPrice')
      .optional()
      .isFloat({min:0})
      .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors
  ];


router.get('/',validateQuery,async (req, res,next) => {

let { page, size,maxLat,minLat,maxLng,minLng,maxPrice,minPrice } = req.query;

page = parseInt(page);
size = parseInt(size);
maxLat = parseFloat(maxLat);
minLat = parseFloat(minLat);
maxLng = parseFloat(maxLng);
minLng = parseFloat(minLng);
maxPrice = parseFloat(maxPrice);
minPrice = parseFloat(minPrice);


let pagination = {}
if(!page) page = 1
if(!size) size = 20
pagination.limit = size
pagination.offset = size * (page - 1)

let where = {}
if(maxLat&&(!minLat)){where.lat={[Op.lte]:maxLat}}
if((!maxLat)&&minLat){where.lat={[Op.gte]:minLat}}
if(maxLat&&minLat){where.lat={[Op.between]:[minLat,maxLat]}}

if(maxLng&&(!minLng)){where.lat={[Op.lte]:maxLng}}
if((!maxLng)&&minLng){where.lat={[Op.gte]:minLng}}
if(maxLng&&minLng){where.lat={[Op.between]:[minLng,maxLng]}}

if(maxPrice&&(!minPrice)){where.lat={[Op.lte]:maxPrice}}
if((!maxPrice)&&minPrice){where.lat={[Op.gte]:minPrice}}
if(maxPrice&&minPrice){where.lat={[Op.between]:[minPrice,maxPrice]}}

console.log("where: "+where.lat)
let allSpots=await Spot.findAll({
        include: [
        { model:Review },
        { model:SpotImage}
        ],
        where,
        ...pagination
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
    if(!spot.SpotImages.length){ spot.previewImage=""}
    delete spot.Reviews
    delete spot.SpotImages

})
  let result={Spots}
  result.page=page
  result.size=size

  
  res.json(result);

});


router.get('/current',restoreUser,requireAuth,async (req, res) => {
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
    
    if(!spot.SpotImages.length){ spot.previewImage=""}
    
    delete spot.Reviews
    delete spot.SpotImages
    delete spot.User
})

    res.json({Spots})
  }
);


router.get('/:spotId/reviews',async (req, res,next) => {

    
    let oneSpot=await Spot.findByPk(req.params.spotId);
    
    if(!oneSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }

    let Reviews=await Review.findAll({
        include: [
        { model:User,attributes: ['id','firstName','lastName']},
        { model:ReviewImage,attributes: ['id','url']}
        ],
        where:{spotId:req.params.spotId}
    });
    

    res.json({Reviews})

});

router.get('/:spotId/bookings',restoreUser,requireAuth,async (req, res,next) => {

    const { user } = req;

    let currentSpot=await Spot.findByPk(req.params.spotId)

    if(!currentSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }

    if(user.id===currentSpot.ownerId){
        const bookings=await Booking.findAll({
            include: [
            { model:User,attributes: ['id','firstName','lastName']},
            ],
            where:{spotId:req.params.spotId},
  
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


router.get('/:spotId',async (req,res,next) => {

    let tempSpot=await Spot.findByPk(req.params.spotId,{
        include: [
            { model:Review },
            { model:SpotImage, attributes: ['id','url','preview']},
            { model:User,attributes: ['id','firstName','lastName']}
            ],
    });

    if(!tempSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }

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


router.put('/:spotId',restoreUser,requireAuth,validateSpot,async (req, res, next) => {

    const { address,city,state,country,lat,lng,name,description,price}=req.body

    let currentSpot=await Spot.findByPk(req.params.spotId);
    
    if(!currentSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    if(currentSpot.ownerId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Spot must belong to the current user"};
        err.status = 403;
        return next(err);
    }
    currentSpot.update({
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

    res.json(oneSpot)

});



router.post('/',restoreUser,requireAuth,validateSpot,async (req, res) => {
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

    res.statusCode=201
    res.json(newSpot)
  }
);

router.post('/:spotId/images',restoreUser,requireAuth,async (req, res, next) => {

    let currentSpot=await Spot.findByPk(req.params.spotId)

    if(!currentSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    if(currentSpot.ownerId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Spot must belong to the current user"};
        err.status = 403;
        return next(err);
    }

    const { url,preview }=req.body

    const spot=await Spot.findByPk(req.params.spotId)
    const newSpotImage=await spot.createSpotImage({
        url,
        preview
    })
    
    res.statusCode=201
    res.json(newSpotImage)
  }
);

router.post('/:spotId/reviews',restoreUser,requireAuth,validateReviews,async (req, res, next) => {
    const { user } = req;
    const { review,stars }=req.body

    const spot=await Spot.findByPk(req.params.spotId)
    
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    
    const checkReview=await Review.findOne({
        where:{
               [Op.and]:[{userId:req.user.id},{spotId:req.params.spotId}]
        }
    })
    if(checkReview){
        const err = new Error("User already has a review for this spot");
        err.title = "Forbidden error";
        err.errors = {"forbidden":"User already has a review for this spot"};
        err.status = 403;
        return next(err);
    }

    const newReview=await spot.createReview({
        review,
        stars,
        userId:user.id
    })

    res.statusCode=201
    res.json(newReview)
  }
);

// Create and return a new booking from a spot specified by id.
router.post('/:spotId/bookings',restoreUser, requireAuth,validateBooking,async (req, res,next) => {
    const { user } = req;
    const { startDate,endDate }=req.body

    const spot=await Spot.findByPk(req.params.spotId);
    
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    if(Date.parse(startDate)>=Date.parse(endDate)){
        const err = new Error("Validation error");
        err.title = "Validation error";
        err.errors = {"endDate":"endDate cannot be on or before startDate"};
        err.status = 400;
        return next(err);
    }

    const bookingrecord = await Booking.findAll({
        where:{
            [Op.and]:[
             {startDate:{[Op.lte]:endDate}},
             {endDate:{[Op.gte]:startDate}}
            ],
            spotId:req.params.spotId
        }
    })

    if(bookingrecord.length){
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.title = "Forbidden error";
        err.errors = {    
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
        };
        err.status = 403;
        return next(err);
    }

    const newBooking=await spot.createBooking({
        startDate,
        endDate,
        userId:user.id
    })

    res.json(newBooking)
  }
);

router.delete('/:spotId',restoreUser, requireAuth,async (req, res,next) => {
    

    const currentSpot=await Spot.findByPk(req.params.spotId);

    if(!currentSpot){
        const err = new Error("Spot couldn't be found");
        err.title = "HTTP error";
        err.errors = {"spotId":"Spot couldn't be found"};
        err.status = 404;
        return next(err);
    }
    if(currentSpot.ownerId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Spot must belong to the current user"};
        err.status = 403;
        return next(err);
    }

    currentSpot.destroy(),

    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
  );

module.exports = router;
