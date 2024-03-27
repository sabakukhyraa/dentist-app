const User = require('../models/userModel.js')

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
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