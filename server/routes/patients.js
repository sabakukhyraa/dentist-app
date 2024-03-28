const express = require("express");
const router = express.Router();
const {
  getAllPatients,
  getPatient,
  getPatientsByDoctor,
  createPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController.js");

// GET all patients
router.get("/", getAllPatients);

// GET a single patient
router.get("/:id", getPatient);

// GET patients of a doctor
router.get("/:doctorId", getPatientsByDoctor);

// POST a new patient
router.post("/", createPatient);

// DELETE a patient
router.delete("/:id", deletePatient);

// UPDATE a patient
router.patch("/:id", updatePatient);

module.exports = router;
