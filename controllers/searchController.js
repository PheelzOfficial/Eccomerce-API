const Product = require("../models/productModel");

exports.search = async (req, res) => {
    const query = req.query.q;
    // Perform search logic based on the query
    const results = Products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    if (results === "") {
      res.status(404).json({
        status: 404,
        message: "Result not found !",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "Search found !",
      data: results,
    });
  };