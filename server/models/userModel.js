const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
  userInfo,
) {
  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  if (role == "Doctor") {
    const user = this.create({
      email,
      password: hashedPassword,
      role,
      doctorInfo: userInfo,
    });

    return user;

  } else if (role == "Patient") {
    const user = this.create({
      email,
      password: hashedPassword,
      role,
      patientInfo: role == "Patient" ? userInfo : null,
    });

    return user;

  } else {
    throw new Error("Invalid role!");
  }

};

module.exports = mongoose.model("User", userCredentialSchema);
