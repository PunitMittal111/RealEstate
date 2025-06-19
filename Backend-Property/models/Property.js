const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    sqft: {
      type: Number,
      required: true,
    },
    yearBuilt: {
      type: Number,
    },
    lotSize: {
      type: String,
    },
    parking: {
      type: String,
    },
    heating: {
      type: String,
    },
    cooling: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
    },
    propertyType: {
      type: String,
      enum: ["House", "Condo", "Townhouse", "Apartment"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
