// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingsRouter = require('./bookings.js');
const reviewsRouter = require('./reviews.js');
const spotimagesRouter = require('./spotimages.js');
const reviewimagesRouter = require('./reviewimages.js');


// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

// router.get('/restore-user',(req, res) => {
//     return res.json(req.user);
//   }
// );

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth',requireAuth,(req, res) => {
//     return res.json(req.user);
//   }
// );

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotimagesRouter);
router.use('/review-images', reviewimagesRouter);


router.post('/test', async(req, res) => {

  res.json(tempspot);
});


module.exports = router;




