const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user._id,
    };
    const property = new Property(propertyData);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create property", error: err.message });
  }
};

exports.getAllProperty = async (req, res) => {
  try {
    const property = await Property.find();
    res.status(200).json(property);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch properties", error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.findById(id).populate("owner");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch property" });
  }
};
