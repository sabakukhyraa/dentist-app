const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Static signup method
userCredentialSchema.statics.signup = async function(email, password, userType) {
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = this.create({
    email,
    password: hashedPassword,
    userType
  });

  return user;
};

module.exports = mongoose.model("User", userCredentialSchema);
