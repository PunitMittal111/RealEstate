const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

router.post("/add/:propertyId", protect, addFavorite);
router.get("/get", protect, getFavorites);
router.delete("/remove/:propertyId", protect, removeFavorite);

module.exports = router;
