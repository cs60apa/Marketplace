const User = require("../model/userModel");

// Register a new user
exports.register = async (req, res) => {
  const { email, storename, password, name } = req.body;

  try {
    const user = await User.create({ email, storename, password, name });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
