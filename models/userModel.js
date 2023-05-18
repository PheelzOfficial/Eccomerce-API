const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "co-admin", "admin"],
    default: "user",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "please provide your date of birth "],
  },
  interest: {
    type: String,
    enum: ["Womenswear", "Menswear"],
    required: [true, "please pick a category "],
  },
  defaultAndSale: {
    type: Boolean,
    required: false,
    default: false,
  },
  newStuff: {
    type: Boolean,
    required: false,
    default: false,
  },
  yourExclusives: {
    type: Boolean,
    required: false,
    default: false,
  },
  asosPartner: {
    type: Boolean,
    required: false,
    default: false,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});



module.exports = mongoose.model("User", userSchema);
