const express = require("express");
const {
  getAllPatients,
  getPatient,
  getPatientsByDoctor,
  countPatientsByDoctor,
  createPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController.js");
const requireAuth = require("../middleware/requireAuth.js")
const requireRole = require("../middleware/requireRole.js")

const router = express.Router();

router.use(requireAuth); // only authenticated users can access these routes

// GET all patients
router.get("/all", requireRole("Admin"), getAllPatients);

// GET patients of a doctor
router.get("/", requireRole("Doctor"), getPatientsByDoctor);

// GET the patients number of a doctor
router.get("/count", requireRole("Doctor"), countPatientsByDoctor);

// POST a new patient
router.post("/", requireRole("Doctor"), createPatient);

// GET a single patient
router.get("/:id", getPatient);

// DELETE a patient
router.delete("/:id", requireRole("Doctor"), deletePatient);

// UPDATE a patient
router.patch("/:id", requireRole("Doctor"), updatePatient);

module.exports = router;
