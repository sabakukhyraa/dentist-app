const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userCredentialSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Doctor", "Patient"],
    required: true,
  },
});


module.exports = mongoose.model("User", userCredentialSchema);