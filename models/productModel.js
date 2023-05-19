const mongoose = require("mongoose");

//This is the product schema/model
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the title"],
  },
  description: {
    type: String,
    required: [true, "Please provide the description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide the price"],
  },
  brand: {
    type: String,
    required: [true, "Please provide the brand"],
  },
  size: {
    type: String,
    required: [true, "Please provide the size"],
  },
  colour: {
    type: String,
    required: [true, "Please provide the colour"],
  },
  productCode: {
    type: Number,
    default: Math.random,
  },
  sizeAndFit: {
    type: String,
    required: [true, "Please provide the size and fit"],
  },
  modelHeight: {
    type: String,
    required: [true, "Please provide the model height"],
  },
  modelWearing: {
    type: String,
    required: [true, "Please provide the details"],
  },
  lookAfterMe: {
    type: String,
    required: [true, "Please provide the this field"],
  },
  aboutMe: {
    type: String,
    required: [true, "Please provide the section"],
  },
  style: {
    type: String,
    required: [true, "Please provide the style"],
  },
  images: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
  productType: {
    type: String,
    required: [true, "Please provide the product type"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  bodyFit: {
    type: String,
    required: [true, "Please provide the body fit"],
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Middleware function to generate a random product code before saving
productSchema.pre("save", function (next) {
  if (!this.productCode) {
    // Generate a random 10-digit product code
    const randomCode = (Math.floor(Math.random() * 10) + 1).toString();
    this.productCode = randomCode;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
