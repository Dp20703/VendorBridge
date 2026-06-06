import { validationResult } from "express-validator";
import apiError from "../utils/apiError.js";

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new apiError(
          400,
          "Validation failed",
          errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
          })),
        ),
      );
    }

    next();
  };
};

export default validate;
