
const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getPublicProjects
} = require("../controllers/projectController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// public route to get projects for homepage
router.get("/public", getPublicProjects);


// Create project (Admin only)
router.post(
  "/create",
  protect,
  adminOnly,
  upload.single("image"),
  createProject
);

// Get all projects
router.get("/all", protect, adminOnly, getProjects);

// Get single project
router.get("/:id", protect, adminOnly, getProjectById);

// Update project
router.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProject
);

// Delete project
router.delete("/delete/:id", protect, adminOnly, deleteProject);


module.exports = router;
