const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
  const { email, storename, password, name } = req.body;

  // account-activation

  const user = await User.create({ email, storename, password, name });
  res.status(200).json({
    success: true,
    user,
  });
});

// Login user
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1. get user from db using email
  const dbUser = await User.findOne({ email }).select("+password");

  // 2. check if user exists
  if (!dbUser) {
    next(new AppError("We do not have a user with that email", 404));
  }

  // 3. compare passwords
  const comparePassword = await dbUser.comparePassword(
    password,
    dbUser.password
  );

  if (comparePassword) {
    // 4. create a jsonwebtoken
    const token = jwt.sign(
      {
        id: dbUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_SECRET_EXPIRES,
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  } else {
    next(new AppError("Password or Email is incorrect", 400));
  }
});
