const User = require('../models/userModel.js');
const { createDoctor } = require('./doctorController.js');

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
};

// sign up user
const signUpDoctorUser = async (req, res) => {

  const { email, password, name } = req.body;
  const newDoctor = await createDoctor(name)

  try {
    const user = await User.signUp(email, password, "Doctor", newDoctor);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
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