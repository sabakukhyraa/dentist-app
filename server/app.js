require("dotenv").config();
const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patients.js");
const userRoutes = require("./routes/users.js");
const doctorRoutes = require("./routes/doctors.js")

// express app
const app = express();
app.use(cors())

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `------------------------\nThe path the request came from: ${req.path}\nRequest method: ${req.method}\n------------------------`
  );
  next();
});

//routes
app.use("/api/patients", patientRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctors", doctorRoutes);

module.exports = app;