const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  // Other category fields...
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
