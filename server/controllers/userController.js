const User = require('../models/userCredentialModel.js')

// login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, userType } = req.body

  try {
    const user = await User.signup(email, password, userType);

    res.status(200).json({email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

module.exports = { loginUser, signupUser };