const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// There is an one-to-many relationship between Patients and DefinedTeeth.
// Patients are the "one" side of the relationship and DefinedTeeth are the "many" side.
const toothSchema = new Schema({
  toothNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Can create Treatment Schema for this particular property as an array [treatmentSchema] later.
  treatmentsBefore: {
    type: Array,
    required: false,
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
    isAdult: {
      type: Boolean,
      required: true,
    },
    hasWisdomTeeth: {
      type: Boolean,
      required: false,
    },
    definedTeeth: [toothSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
