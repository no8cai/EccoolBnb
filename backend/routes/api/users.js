// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage("Username is required with at least 4 characters."),
    check('username')
      .not()
      .isEmail()
      .withMessage("Username cannot be an email."),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage("First Name is required"),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage("Last Name is required"),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters or more."),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',validateSignup,
    async (req, res, next) => {
      
      const { firstName,lastName,email, password, username } = req.body;
      const { token } = req.cookies;

      const tempUser1=await User.findOne({where:{email}})
      const tempUser2=await User.findOne({where:{username}})
      if(tempUser1){
        // res.statusCode=403
        // res.json({
        //     "message": "User already exists",
        //     "statusCode": 403,
        //     "errors": {
        //       "email": "User with that email already exists"
        //     }
        // })
        // return
        const err = new Error("User already exists");
        err.title = "Validation error";
        err.errors ={"email":"User with that email already exists"};
        err.status = 403;
        next(err);
      }
      else if(tempUser2){
        // res.statusCode=403
        // res.json({
        //     "message": "User already exists",
        //     "statusCode": 403,
        //     "errors": {
        //       "username": "User with that username already exists"
        //     }
        // })
        // return
        const err = new Error("User already exists");
        err.title = "Validation error";
        err.errors = {"username":"User with that username already exists"};
        err.status = 403;
        next(err);

      }
      else{
      const user = await User.signup({ firstName,lastName,email, username, password });
      
      await setTokenCookie(res, user);
      
      let tempuser=user.toJSON();
      tempuser.token=token

      return res.json(tempuser);
      }
    }); 

// router.use((err,req,res,next)=>{
//     err.status=403
//     next(err)
// })

module.exports = router;