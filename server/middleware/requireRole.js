const User = require("../models/userModel");

const requireRole = (role) => {
  return async (req, res, next) => {
    if (req.user?.role == role) {
      if (role == "Doctor") {
        req.user.doctorInfo = await User.findOne({ _id: req.user._id }).select(
          "doctorInfo"
        );
      }
      next();
    } else {
      res.status(403).json({
        error: `Unauthorized access. You have to be ${role} to access this API route. You are ${req.user.role}`,
      });
    }
  };
};

module.exports = requireRole;
