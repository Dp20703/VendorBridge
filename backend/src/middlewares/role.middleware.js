import apiError from "../utils/apiError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new apiError(403, "Unauthorized access"));
    }

    next();
  };
};
