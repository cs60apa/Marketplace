const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "10m" });
};

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
  const { email, storename, password, name } = req.body;
  // account-activation

  // 1. Activation token
  const activationToken = createActivationToken({
    email,
    storename,
    password,
    name,
  });

  // 2. Confirmation link
  const ConfirmationLink = `${process.env.FRONTEND_URL}/activation?activationToken=${activationToken}`;

  // 3. Create a subscriber using strorename
  await novu.subscribers.identify(storename, {
    firstName: name,
    email,
  });

  // 4. Triger notification
  await novu,
    trigger("account-activation", {
      to: {
        subscriberId: storename,
      },
      payload: {
        company: "Lupleg",
        ConfirmationLink,
      },
    });

  // 5. Send response
  res.status(200).json({
    success: true,
    message: `Please go to your email -${email} to activate your account`,
  });
});

// Activate user account
exports.activateUser = catchAsync(async (req, res, next) => {
  // 1. verify token
  const userData = jwt.verify(
    req.body.activationToken,
    process.env.ACTIVATION_SECRET
  );

  // 2. check if user data is available and find the user
  if (!userData) return next(new AppError("your token is wrong", 400));

let user = await User.findOne({ email: userData.email });

  // 3. if there is a user, throw error else create user
  if (user) {
    return next(new AppError("User already exists", 400));
  } else {
    user = await User.create(userData)
    // 4. delete subcribe with storename
    await novu.subscribers.delete(userData.storename);


    // create subscriber with newly created userId
    await novu.subscribers.identify(user._id);
  }

  // 6. send response
  res.status(200).json({
    success: true,
    message: "Account activated successfully",
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
