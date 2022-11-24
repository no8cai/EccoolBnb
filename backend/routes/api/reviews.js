// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review,ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.post('/:reviewId/images',restoreUser,async (req, res) => {
    const { user } = req;
    const { url,preview }=req.body
    
    const review=await Review.findByPk(req.params.reviewId)
    const newReviewImage=await review.createReviewImage({
        url,
        preview
    })

    res.json(newReviewImage)
  }
);



module.exports = router;