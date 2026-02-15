const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientLogos,
} = require("../controllers/clientController");

const router = express.Router();


// PUBLIC ROUTE FIRST
router.get("/logos", getClientLogos);


//  ADMIN ROUTES
router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("logo"),
  createClient
);

router.post("/add", protect, adminOnly, createClient);

router.get("/all", protect, adminOnly, getClients);

// ⚠ ALWAYS keep dynamic routes LAST
router.get("/:id", protect, adminOnly, getClientById);

router.put("/update/:id", protect, adminOnly, updateClient);

router.delete("/delete/:id", protect, adminOnly, deleteClient);

module.exports = router;
