// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Booking,Spot,Review,ReviewImage,SpotImage,User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current',restoreUser,async (req, res) => {
    const { user } = req;

    let allBookings=await Booking.findAll({
        include: [
        { model:Spot,
                attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price'],
                include:[{model:SpotImage}]
        }
        ],
        where:{userId:user.id}
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

      delete booking.Spot.SpotImages

  })

    res.json({Bookings})
  }
  );

router.put('/:bookingId',restoreUser, async (req, res) => {
    const { user } = req;
    const { startDate,endDate }=req.body

    const oneBooking=await Booking.findByPk(req.params.bookingId);

    if(startDate){oneBooking.startDate=startDate}
    if(endDate){oneBooking.endDate=endDate}

    res.json(oneBooking)
  }
);

router.delete('/:bookingId',restoreUser, async (req, res) => {
    const { user } = req;

    const oneBooking=await Booking.findByPk(req.params.bookingId);

    oneBooking.destroy(),
    
    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
);


module.exports = router;
