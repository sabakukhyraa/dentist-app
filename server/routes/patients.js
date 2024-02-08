const express = require("express");

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
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new patient" });
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
