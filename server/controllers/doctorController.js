const Doctor = require("../models/doctorModel.js");

const createDoctor = async (name) => {
  const newDoctor = await Doctor.create({ name });

  const savedDoctor = await newDoctor.save();

  return savedDoctor
}

module.exports = { createDoctor };