// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Review,ReviewImage,User,Spot,SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current',restoreUser,async (req, res) => {
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

    delete review.Spot.SpotImages

})

  res.json({Reviews})
}
);




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

router.put('/:reviewId',async (req, res) => {

  const { review,stars}=req.body

  let oneReview=await Review.findByPk(req.params.reviewId);

  if(review){oneReview.review=review}
  if(stars){oneReview.stars=stars}

  res.json(oneReview)

});


router.delete('/:reviewId',restoreUser, async (req, res) => {
  const { user } = req;

  const oneReview=await Review.findByPk(req.params.reviewId);

  oneReview.destroy(),

  res.json({
      message:'Successfully deleted',
      statusCode:200
  })
}
);


module.exports = router;
