const AppError = require("../utilities/appError");

const generateError = (err) => {
  switch (err.name) {
    case "CastError":
      return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    case "ValidationError":
      return new AppError(`Validation error`, 422);
    case "JsonWebTokenError":
      return new AppError("401 You are not authorized to access this", 401);
    default:
      return err;
  }
};

module.exports = (err, req, res, next) => {
  const error = generateError(err);
  error.statusCode = error.statusCode || 500;
  const response = {
    status: error.status,
    message: error.message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  res.status(error.statusCode).json(response);
};
