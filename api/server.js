const app = require("./app");
const mongoose = require("mongoose");

const connectToMongo = () => {
  const url = process.env.MONGODB_CS;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Connected to MongoDB " + data.connection.host);
    })
    .catch((error) => {
      console.log(error);
    });
};

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Error = " + err.message);
  console.log("Shutting down the application due to uncaught exception");
});

connectToMongo();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log("Our app is running on PORT " + port);
});

// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`${err.name} ${err.message}`);
  // close the server
  server.close(() => {
    // exit the node process
    process.exit(1);
  });
});
