const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role == role) {
      next()
    } else {
      res
        .status(403)
        .json({ error: `Unauthorized access. You have to be ${role} to access this API route. You are ${req.user.role}` });
    }
  }
}

module.exports = requireRole