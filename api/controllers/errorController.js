const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.statusCode = err.statusCode || "error");

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
