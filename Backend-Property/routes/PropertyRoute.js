const express = require("express");
const router = express.Router();
const {
  createProperty,
  getAllProperty,
  getPropertyById,
} = require("../controllers/PropertyController");
const { protect } = require("../middleware/auth");

router.post("/createproperty", protect, createProperty);
router.get("/property", protect, getAllProperty);
router.get("/property/:id", getPropertyById);

module.exports = router;
