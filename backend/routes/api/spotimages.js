// backend/routes/api/spotimages.js
const express = require('express')
const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId',restoreUser, requireAuth,async (req, res,next) => {

    const oneSpotimage=await SpotImage.findByPk(req.params.imageId);

    if(!oneSpotimage){
        const err = new Error("Spot Image couldn't be found");
        err.title = "HTTP error";
        err.errors = {"imageId":"Spot Image couldn't be found"};
        err.status = 404;
        return next(err);
    }

    let currentSpot=await Spot.findByPk(oneSpotimage.spotId)

    if(currentSpot.ownerId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Spot must belong to the current user"};
        err.status = 403;
        return next(err);
    }
    
    oneSpotimage.destroy(),

    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
);

module.exports = router;
