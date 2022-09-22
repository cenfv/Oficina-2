const mongoose = require("mongoose");

mongoose.set("runValidators", true);

const options = {
  autoIndex: true,
};
require("dotenv").config();

module.exports.connect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, options)
    .then((res) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Unable to connect to MongoDB", err);
    });
};
