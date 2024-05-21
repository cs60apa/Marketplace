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

connectToMongo();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Our app is running on PORT " + port);
});
