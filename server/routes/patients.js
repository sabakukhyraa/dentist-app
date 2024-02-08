const express = require("express");
const Patient = require("../models/patientModel.js");
const router = express.Router();
const {
  getAllPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController.js");

// GET all patients
router.get("/", getAllPatients);

// GET a single patient
router.get("/:id", getPatient);

// POST a new patient
router.post("/", createPatient);

// DELETE a patient
router.delete("/:id", deletePatient);

// UPDATE a patient
router.patch("/:id", updatePatient);

module.exports = router;
