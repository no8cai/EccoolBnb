// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, ReviewImage,Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageId',restoreUser, requireAuth,async (req, res, next) => {
    

    const oneReviewimage=await ReviewImage.findByPk(req.params.imageId);
    if(!oneReviewimage){
        const err = new Error("Review Image couldn't be found");
        err.title = "HTTP error";
        err.errors = {"imageId":"Review Image couldn't be found"};
        err.status = 404;
        return next(err);
    }

    let currentReview=await Review.findByPk(oneReviewimage.reviewId)

    if(currentReview.userId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Review must belong to the current user"};
        err.status = 403;
        return next(err);
    }

    oneReviewimage.destroy(),

    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
);


module.exports = router;
