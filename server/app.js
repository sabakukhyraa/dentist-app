require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Patient = require("./models/patient.js");
const patientRoutes = require("./routes/patients.js");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/patients", patientRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Connected to the db!");
  })
  .catch((err) => console.log(err));
