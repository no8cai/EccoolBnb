// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { validateSignup } = require('../../utils/datavalidations');

const router = express.Router();

// Sign up
// Creates a new user, logs them in as the current user, and returns the current user's information.
router.post(
    '/',validateSignup,
    async (req, res, next) => {
      
      const { firstName,lastName,email, password, username } = req.body;
      const { token } = req.cookies;
      
      //query from existing users
      const tempUser1=await User.findOne({where:{email}})
      const tempUser2=await User.findOne({where:{username}})
      //Error response: User already exists with the specified email
      //Error response: User already exists with the specified username
      if(tempUser1){
        const err = new Error("User already exists");
        err.title = "Validation error";
        err.errors ={"email":"User with that email already exists"};
        err.status = 403;
        next(err);
      }
      else if(tempUser2){
        const err = new Error("User already exists");
        err.title = "Validation error";
        err.errors = {"username":"User with that username already exists"};
        err.status = 403;
        next(err);
      }
      else{
    // sign up succuessful if pass the inpections. 
      const user = await User.signup({ firstName,lastName,email, username, password });
      
      await setTokenCookie(res, user);
      
      let tempuser=user.toJSON();
      tempuser.token=token

      return res.json({user:tempuser});
      }
    }); 


module.exports = router;