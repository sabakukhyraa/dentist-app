const Patient = require("../models/patientModel.js");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

// GET all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).sort({
      createdAt: -1
    });
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET a single patient
const getPatient = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: "No such patient!" });
    }

    res.status(200).json(patient);
  } else {
    res.status(500).json({ error: "Invalid patient ID" });
  }
};

// GET patients of a doctor
const getPatientsByDoctor = async (req, res) => {
  const doctorId = req.user._id;
  try {
    const patients = await Patient.find({ doctor: doctorId }).sort({
      createdAt: -1,
    });
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET the patients number of a doctor
const countPatientsByDoctor = async (req, res) => {
  const doctor = req.user._id;

  try {
    const count = await Patient.countDocuments({ doctor: doctor });

    return res.status(201).json(count)
  } catch (error) { 
    res.status(400).json({ message: error.message });
  }
}

// POST a new patient
const createPatient = async (req, res) => {
  try {
    const { name, birthDate, definedTeeth, isAdult, hasWisdomTeeth } = req.body;
    const doctorInfo = await User.findOne({ _id: req.user._id }).select(
      "doctorInfo"
    );

    // Verify data from request
    if (!name || !birthDate) {
      return res.status(400).json({ message: "Eksik bilgi." });
    }

    const newPatient = await Patient.create({
      name,
      birthDate,
      definedTeeth: [], // empty array
      isAdult,
      hasWisdomTeeth: !!hasWisdomTeeth,
      doctor: doctorInfo.doctorInfo,
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
};

// DELETE a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const patient = await Patient.findOneAndDelete({ _id: id });

    if (!patient) {
      return res.status(404).json({ error: "No such patient!" });
    }

    res.status(200).json({ patient });
  } else {
    res.status(500).json({ error: "Invalid patient ID" });
  }
};

// UPDATE a patient
const updatePatient = async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const patient = await Patient.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!patient) {
      return res.status(404).json({ error: "No such patient!" });
    }

    res.status(200).json({ patient });
  } else {
    res.status(500).json({ error: "Invalid patient ID" });
  }
};

module.exports = {
  getAllPatients,
  getPatient,
  getPatientsByDoctor,
  countPatientsByDoctor,
  createPatient,
  deletePatient,
  updatePatient,
};
