// backend/routes/api/reviews.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const { Review,ReviewImage,User,Spot,SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateReviews,validateReviewimage} = require('../../utils/datavalidations');


const router = express.Router();
const Sequelize = require('sequelize');

router.get('/current',restoreUser,requireAuth,async (req, res) => {
  const { user } = req;

  let allReviews=await Review.findAll({
      include: [
      { model:User,attributes: ['id','firstName','lastName']},
      { model:Spot,
        attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price'],
        include:[{model:SpotImage}]
      },
      { model:ReviewImage,attributes: ['id','url']}
      ],
      where:{userId:user.id}
  });

  let Reviews=[];
    allReviews.forEach(review=>{
    Reviews.push(review.toJSON())
  })

  Reviews.forEach(review=>{

    review.Spot.SpotImages.forEach(image=>{
        if(image.preview===true){
            review.Spot.previewImage=image.url
        }
    })
    if(!review.Spot.SpotImages.length){ review.Spot.previewImage=""}
    delete review.Spot.SpotImages

})

  res.json({Reviews})
}
);




router.post('/:reviewId/images',restoreUser,requireAuth,validateReviewimage,async (req, res, next) => {
    
    const { url }=req.body

    const review=await Review.findByPk(req.params.reviewId)
    if(!review){
        const err = new Error("Review couldn't be found");
        err.title = "HTTP error";
        err.errors = {"reviewId":"Review couldn't be found"};
        err.status = 404;
        return next(err);
    }
    if(review.userId!==req.user.id){
        const err = new Error("Forbidden");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Review must belong to the current user"};
        err.status = 403;
        return next(err);
    }
    
    const allimages=await ReviewImage.findAll({
        where:{reviewId:req.params.reviewId}
    })
    
    if(allimages.length>10){
        const err = new Error("Maximum number of images for this resource was reached");
        err.title = "Authorization error";
        err.errors = {"Authorization":"Maximum number of images for this resource was reached"};
        err.status = 403;
        return next(err);
    }

    const newReviewImage=await review.createReviewImage({
        url,
    })

    res.json(newReviewImage)
  }
);

router.put('/:reviewId',restoreUser,requireAuth,validateReviews,async (req, res,next) => {

  const { review,stars}=req.body

  let oneReview=await Review.findByPk(req.params.reviewId);
  
  if(!oneReview){
    const err = new Error("Review couldn't be found");
    err.title = "HTTP error";
    err.errors = {"reviewId":"Review couldn't be found"};
    err.status = 404;
    return next(err);
}
    oneReview.update({
       review,
       stars
     })

  res.json(oneReview)

});


router.delete('/:reviewId',restoreUser,requireAuth,async (req, res,next) => {
  

  const oneReview=await Review.findByPk(req.params.reviewId);

  if(!oneReview){
    const err = new Error("Review couldn't be found");
    err.title = "HTTP error";
    err.errors = {"reviewId":"Review couldn't be found"};
    err.status = 404;
    return next(err);
  } 
  if(oneReview.userId!==req.user.id){
    const err = new Error("Forbidden");
    err.title = "Authorization error";
    err.errors = {"Authorization":"Review must belong to the current user"};
    err.status = 403;
    return next(err);
}

  oneReview.destroy(),

  res.json({
      message:'Successfully deleted',
      statusCode:200
  })
}
);


module.exports = router;
