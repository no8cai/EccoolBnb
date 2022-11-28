const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      let errorsobject={}
      const errors = validationErrors
        .array()
        .map((error) => errorsobject[`${error.param}`]=`${error.msg}`);
      
      
      const err = Error("Validation error");
      err.errors = errorsobject;
      err.status = 400;
      err.title = "Validation error";
      next(err);
    }
    next();
  };
  
  module.exports = {
    handleValidationErrors
  };