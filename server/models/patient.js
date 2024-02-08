const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// There is an one-to-many relationship between Patients and DefinedTeeth.
// Patients are the "one" side of the relationship and DefinedTeeth are the "many" side.
const toothSchema = new Schema({
  toothNumber: {
    type: Number,
    required: true,
  },
  treatmentsBefore: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    definedTeeth: [toothSchema],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
