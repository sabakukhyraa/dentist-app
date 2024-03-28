const express = require("express");

// controller funcs
const {
  loginUser,
  signUpDoctorUser,
  signUpPatientUser,
} = require("../controllers/userController.js");

const router = express.Router();

// login route
router.post("/login", loginUser);

// sign up doctor route
router.post("/signup-doctor", signUpDoctorUser);

// sign up patient route
router.post("/signup-patient", signUpPatientUser);

module.exports = router;
