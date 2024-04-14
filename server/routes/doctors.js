const express = require("express");
const { getDoctorName } = require("../controllers/doctorController.js");

const requireAuth = require("../middleware/requireAuth.js");
const requireRole = require("../middleware/requireRole.js");

const router = express.Router();

router.use(requireAuth); // only authenticated users can access these routes

router.get("/", requireRole('Doctor'), getDoctorName);

module.exports = router;