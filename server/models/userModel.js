const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const Doctor = require("./models/doctorModel.js");

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
    type: Schema.Types.ObjectId,
    ref: ["Doctor", "Patient"],
    required: true,
  },
});

// Static signup method
userCredentialSchema.statics.signup = async function (
  email,
  password,
  userType,
  name = null
) {
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (name) {
    const newDoctor = await Doctor.create({
      name,
    });

    const user = this.create({
      email,
      password: hashedPassword,
      userType: newDoctor,
    });
  } else {
    const user = this.create({
      email,
      password: hashedPassword,
      userType,
    });
  }

  return user;
};

module.exports = mongoose.model("User", userCredentialSchema);
