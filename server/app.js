require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Patient = require("./models/patientModel.js");
const patientRoutes = require("./routes/patients.js");

// express app
const app = express();

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

// connect to db
mongoose
  .connect(process.env.DB_URL, {
    dbName: "DentistApp",
  })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    console.log("Connected to the db!");
  })
  .catch((err) => console.log(err));
