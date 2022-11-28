const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');
const { validationResult } = require('express-validator');

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

  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Email or username is required"),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage("Password is required"),
    handleValidationErrors
  ];


  const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({min:-90,max:90})
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({min:-180,max:180})
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .isFloat({min:0})
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

const validateReviews = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({min:1,max:5})
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage("valid startDate is required"),
    check('endDate')
      .exists({ checkFalsy: true })
      .isDate()
      .withMessage("valid endDate is required"),
    handleValidationErrors
  ];

const validateQuery = [
    check('page')
      .optional()
      .isInt({min:1,max:10})
      .withMessage("Page must be greater than or equal to 1"),
    check('size')
      .optional()
      .isInt({min:1,max:20})
      .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
      .optional()
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    check('minLng')
      .optional()
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
    check('maxLng')
      .optional()
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
    check('minPrice')
      .optional()
      .isFloat({min:0})
      .withMessage("Maximum price must be greater than or equal to 0"),
    check('minPrice')
      .optional()
      .isFloat({min:0})
      .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors
  ];

  module.exports = {
    validateSignup,validateLogin,validateSpot,validateReviews,validateBooking,validateQuery
  };