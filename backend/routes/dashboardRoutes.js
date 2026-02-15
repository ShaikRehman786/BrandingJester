const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getRecentClients,
  getRecentProjects,
  getProjectStatusData,
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard overview stats
router.get("/stats", protect, adminOnly, getDashboardStats);

// Latest clients
router.get("/recent-clients", protect, adminOnly, getRecentClients);

// Latest projects
router.get("/recent-projects", protect, adminOnly, getRecentProjects);

// Chart data
router.get("/project-status", protect, adminOnly, getProjectStatusData);

module.exports = router;
