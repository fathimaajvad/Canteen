const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("ENV PATH:", path.resolve(__dirname, "../.env"));
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = require("./app");
const connectDB = require("./config/db");

require("./models/User");
require("./models/Category");
require("./models/Food");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});