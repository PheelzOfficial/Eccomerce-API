const Product = require("../models/productModel");


//this function contains the search logic for the product
exports.search = async (req, res) => {
  const searchTerm = req.params.title;
  const results = Product.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Send the response
  if (results.length > 0) {
    res.status(200).json({ success: true, message: "Search successful", data: results });
  } else {
    res.status(404).json({ success: false, message: "No results found" });
  }
};
