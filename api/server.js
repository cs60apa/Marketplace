const app = require("./app");

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Our app is running on PORT " + port);
});
