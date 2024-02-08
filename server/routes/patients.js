const express = require("express");
const Patient = require("../models/patientModel.js");
const router = express.Router();

// GET all patients
router.get("/", (req, res) => {
  res.json({ mssg: "GET all patients" });
});

// GET a single patient
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ mssg: `GET patient with an ID of ${id}` });
});

// POST a new patient
router.post("/", async (req, res) => {
  try {
    const { name, birthDate, definedTeeth } = req.body;

    // Verify data from request
    if (!name || !birthDate || !definedTeeth) {
      return res.status(400).json({ message: "Eksik bilgi." });
    }

    const newPatient = await Patient.create({
      name, // this is same as "name: name",
      birthDate, // this is same as "birthDate: birthDate",
      definedTeeth: [], // empty array
    });

    // fill the empty array with data from front request
    definedTeeth.forEach((toothData) => {
      const { toothNumber, treatmentsBefore, description } = toothData;
      if (toothNumber && description) {
        newPatient.definedTeeth.push({
          toothNumber,
          treatmentsBefore: treatmentsBefore || [],
          description,
        });
      }
    });

    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a patient
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a patient" });
});

// UPDATE a patient
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a patient" });
});

module.exports = router;
