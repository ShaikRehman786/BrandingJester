const jwt = require("jsonwebtoken");


// ================= PROTECT ROUTES =================
// Verifies JWT token
exports.protect = (req, res, next) => {
  try {
    // Read Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};


// ================= ADMIN ONLY =================
// Restrict access to admin users
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied, admin only",
    });
  }

  next();
};
