const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.statusCode = err.statusCode || "error");

  // 1. handle cast error
  if (err.name === "CastError") {
    const castMessage = `Invalid parameters: ${err.path}: ${err.value}`;
    err = new AppError(castMessage, 400);
  }

  // 2. handle validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((el) => el.message);
    const validationMsg = `Invalid input data ${messages.join(".")}`;
    err = new AppError(validationMsg, 400);
  }

  if (process.env.NODE_ENV !== "production") {
    // Development error handing
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      // Production Error Handling
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }
};
