// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:imageId',restoreUser, async (req, res) => {
    const { user } = req;

    const oneReviewimage=await ReviewImage.findByPk(req.params.imageId);

    oneReviewimage.destroy(),

    res.json({
        message:'Successfully deleted',
        statusCode:200
    })
  }
);


module.exports = router;
