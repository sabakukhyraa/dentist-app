const express = require("express");
const {
  getAllPatients,
  getPatient,
  getPatientsByDoctor,
  createPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController.js");
const requireAuth = require("../middleware/requireAuth.js")
const requireRole = require("../middleware/requireRole.js")

const router = express.Router();

router.use(requireAuth); // only authenticated users can access these routes

// GET all patients
router.get("/", requireRole("Admin"), getAllPatients);

// GET a single patient
router.get("/:id", getPatient);

// GET patients of a doctor
router.get("/:doctorId", requireRole("Doctor"), getPatientsByDoctor);

// POST a new patient
router.post("/", requireRole("Doctor"), createPatient);

// DELETE a patient
router.delete("/:id", requireRole("Doctor"), deletePatient);

// UPDATE a patient
router.patch("/:id", requireRole("Doctor"), updatePatient);

module.exports = router;
