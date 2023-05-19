const mongoose = require("mongoose");

//this is the checkout schema/model that saves product that are checked out successfully
const checkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Checkout", checkoutSchema);
