// backend/routes/index.js
const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });



module.exports = router;


//   let Spots=await Spot.findAll({
//     include: [
//         { model:Review },
//         { model:SpotImage}
//             // [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'averagerate']
//     ],
    // attributes: [ "id","ownerId","address","city","state","country","lat","lng","name","description","price","createdAt","updatedAt","SpotImages.url"
    //     // [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'averagerate']
    // ],
//   });

//   let Spots=await Spot.findAll({
//     include: [
//         {model:SpotImage, attributes: ["url"]},{model:Review, attributes: ["stars"]}
//     ],
//   });
//   let Spots=await Spot.findAll()

//   for(let onespot of Spots){
//      let temp=await SpotImage.findOne({
//         where: {
//             spotId: onespot.id
//         }
//     })
//     console.log("url: "+temp.url)
//     console.log("output :"+onespot.id)
//     onespot.previewImage="bombombombom"
//   }
