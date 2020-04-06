const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  userType: String,
  email: String,
  password: String
});
module.exports = User = mongoose.model("user", userSchema);
