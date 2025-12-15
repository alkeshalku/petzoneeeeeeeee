const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fname: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"],default: "user" },
  isDisabled: { type: Boolean, default: false },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
