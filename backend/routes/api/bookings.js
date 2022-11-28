// backend/routes/api/bookings.js
const express = require('express')
const { restoreUser,requireAuth, } = require('../../utils/auth');
const { Booking,Spot,Review,ReviewImage,SpotImage,User } = require('../../db/models');

const { Op } = require("sequelize");
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { validateBooking } = require('../../utils/datavalidations');


const router = express.Router();


// const validateBooking = [
//     check('startDate')
//       .exists({ checkFalsy: true })
//       .isDate()
//       .withMessage("valid startDate is required"),
//     check('endDate')
//       .exists({ checkFalsy: true })
//       .isDate()
//       .withMessage("valid endDate is required"),
//     handleValidationErrors
//   ];

router.get('/current',restoreUser,requireAuth,async (req, res) => {
    
    let allBookings=await Booking.findAll({
        include: [
        { model:Spot,
                attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price'],
                include:[{model:SpotImage}]
        }
        ],
        where:{userId: req.user.id}
    });

    let Bookings=[];
      allBookings.forEach(booking=>{
      Bookings.push(booking.toJSON())
    })

    Bookings.forEach(booking=>{

      booking.Spot.SpotImages.forEach(image=>{
          if(image.preview===true){
              booking.Spot.previewImage=image.url
          }
      })
      if(!booking.Spot.SpotImages.length){ booking.Spot.previewImage=""}
      delete booking.Spot.SpotImages

  })

    res.json({Bookings})
  }
  );

router.put('/:bookingId',restoreUser,requireAuth,validateBooking,async (req, res,next) => {
    
    const { startDate,endDate }=req.body

    const oneBooking=await Booking.findByPk(req.params.bookingId);

    if(!oneBooking){
        const err = new Error("Booking couldn't be found");
        err.title = "HTTP error";
        err.errors = {"bookingId":"Booking couldn't be found"};
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
    if(oneBooking.userId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Booking must belong to the current user"};
        err.status = 403;
        return next(err);
    }
    if(Date.parse(startDate)<=Date.now()){
        const err = new Error("Past bookings can't be modified");
        err.title = "Forbidden error";
        err.errors = {"Forbidden":"Past bookings can't be modified"};
        err.status = 403;
        return next(err);
    }

    const bookingrecord = await Booking.findAll({
        where:{
            [Op.and]:[
             {startDate:{[Op.lte]:endDate}},
             {endDate:{[Op.gte]:startDate}}
            ],
            spotId:oneBooking.spotId
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

    oneBooking.update({
        startDate,
        endDate
      })

    res.json(oneBooking)
  }
);

router.delete('/:bookingId',restoreUser,requireAuth, async (req, res,next) => {

    const oneBooking=await Booking.findByPk(req.params.bookingId);

    if(!oneBooking){
        const err = new Error("Booking couldn't be found");
        err.title = "HTTP error";
        err.errors = {"bookingId":"Booking couldn't be found"};
        err.status = 404;
        return next(err);
    }

    const currentSpot=await Spot.findByPk(oneBooking.spotId)

    if((oneBooking.userId!==req.user.id)&&(currentSpot.ownerId!==req.user.id)){
        const err = new Error("Booking must belong to the current user or the Spot must belong to the current user");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Booking must belong to the current user or the Spot must belong to the current user"};
        err.status = 403;
        return next(err);
    }

    if(Date.parse(oneBooking.startDate)<=Date.now()){
        const err = new Error("Bookings that have been started can't be deleted");
        err.title = "Forbidden error";
        err.errors = {"Forbidden":"Bookings that have been started can't be deleted"};
        err.status = 403;
        return next(err);
    }

    oneBooking.destroy(),
    
    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
);


module.exports = router;
