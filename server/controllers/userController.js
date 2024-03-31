const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign(
    { _id }, // payload
    process.env.SECRET_STRING,
    { expiresIn: "3d" }
  );
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password)

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up doctor user
const signUpDoctorUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await User.signUp(email, password, "Doctor", name);
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up patient user
const signUpPatientUser = async (req, res) => {
  const { email, password, patient } = req.body;

  try {
    const user = await User.signUp(email, password, "Patient", patient);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpDoctorUser, signUpPatientUser };
