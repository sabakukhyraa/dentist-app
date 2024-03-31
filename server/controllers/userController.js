const User = require('../models/userModel.js');

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
};

// sign up doctor user
const signUpDoctorUser = async (req, res) => {

  const { email, password, name } = req.body;

  try {
    const user = await User.signUp(email, password, "Doctor", name);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up patient user
const signUpPatientUser = async (req, res) => {

  const { email, password, patient } = req.body;

  try {
    const user = await User.signUp(email, password, "Patient", patient);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpDoctorUser, signUpPatientUser };