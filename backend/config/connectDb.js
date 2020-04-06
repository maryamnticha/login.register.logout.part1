const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("finally db is connected woohoo !");
  } catch (error) {
    console.log(error);
  }
};
