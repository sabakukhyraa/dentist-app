const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const { createDoctor } = require("../controllers/doctorController.js");

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
  role: {
    type: String,
    enum: ["Doctor", "Patient"],
    required: true,
  },
  doctorInfo: {
    type: Schema.Types.ObjectId,
    refPath: "role",
    required: this.role == "Doctor" ? true : false,
  },
  patientInfo: {
    type: Schema.Types.ObjectId,
    refPath: "role",
    required: this.role == "Patient" ? true : false,
  },
});

// Static signUp method
userCredentialSchema.statics.signUp = async function (
  email,
  password,
  role,
  userInfo
) {
  // Validation
  if (!email || !password) {
    throw Error("Email and Password are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("Email already in use!");
  }

  // Password encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (role == "Doctor") {
    const newDoctor = await createDoctor(userInfo);

    const user = this.create({
      email,
      password: hashedPassword,
      role,
      doctorInfo: newDoctor,
    });

    return user;
  } else if (role == "Patient") {
    const user = this.create({
      email,
      password: hashedPassword,
      role,
      patientInfo: userInfo,
    });

    return user;
  } else {
    throw new Error("Invalid role!");
  }
};

module.exports = mongoose.model("User", userCredentialSchema);
