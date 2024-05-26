const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/AppError");

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/hello", (req, res) => {
  res.status(200).send("Hello, Welcome to Lupleg Marketplace API!");
});

app.use("/user", userRoutes);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The route you trying to access is not defined ${req.originalUrl}`,
      400
    )
  );
});

module.exports = app;
