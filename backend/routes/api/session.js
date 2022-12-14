// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateLogin } = require('../../utils/datavalidations');

const router = express.Router();

//Logs in a current user with valid credentials and returns the current user's information.
router.post('/',validateLogin,async (req, res, next) => {
      const { credential, password } = req.body;
      const { token } = req.cookies;
      
      const tempuser = await User.login({ credential, password });
      

      if (!tempuser) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        err.title = 'Login failed';
        err.errors = {"Login failed":"The provided credentials were invalid"};
        return next(err);
      }
  
      await setTokenCookie(res, tempuser);
      
      let user=tempuser.toJSON();
      user.token=token

      delete tempuser.createdAt
      delete tempuser.updatedAt
      return res.json({user});
    }
  );

// Log out
router.delete('/',(_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
// Returns the information about the current user that is logged in.
// router.get('/',(req, res) => {
router.get('/',restoreUser,(req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
          {user: user.toSafeObject()}
        );
      } else return res.json({ user: null });
    }
  );




module.exports = router;