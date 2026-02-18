const express = require("express");
const router = express.Router();

/* ================= MIDDLEWARE ================= */

const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware")

/* ================= CONTROLLER ================= */

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getPublicTeam
} = require("../controllers/employeeController");

/* ================= ROUTES ================= */

router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"), 
  createEmployee
);

router.get("/all", protect, adminOnly, getEmployees);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateEmployee
);

router.delete("/delete/:id", protect, adminOnly, deleteEmployee);

/* ================= PUBLIC TEAM ================= */

router.get("/public", getPublicTeam);

module.exports = router;
