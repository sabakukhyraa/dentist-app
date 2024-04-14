const Doctor = require("../models/doctorModel.js");

// POST a new doctor
const createDoctor = async (name) => {
  const newDoctor = await Doctor.create({ name });

  const savedDoctor = await newDoctor.save();

  return savedDoctor
}

// GET name of the doctor
const getDoctorName = async (req, res) => {
  const doctorInfo = req.user.doctorInfo;
  console.log(doctorInfo);

  try {
    const name = await Doctor.findById(doctorInfo.doctorInfo).select("name");
    return res.status(200).json(name);
  } catch (error) {
    return res.status(400).json( {error: error.message} )
  }
}

module.exports = { createDoctor, getDoctorName };