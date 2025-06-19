const User = require("../models/User");

exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const propertyId = req.params.propertyId;

    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites.push(propertyId);
    await user.save();

    res.status(200).json({ message: "Property added to favorites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.propertyId
    );
    await user.save();

    res.status(200).json({ message: "Property removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
