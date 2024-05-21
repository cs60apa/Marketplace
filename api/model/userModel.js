const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "fullname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password should be more than 6 character"],
      select: false,
    },

    photo: {
      type: String,
      default: "", // TODO: cloudinary url images
    },

    storename: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      lowercase: true,
    },

    introduction: String,
    numProducts: { type: Number, default: 0 },
    bannerImage: {
      type: String,
      default: "", // TODO: Add default image
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
