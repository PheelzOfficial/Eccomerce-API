const Category = require("../models/categoryModel");

exports.allCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      status: 200,
      message: "All categories",
      data: allCategories,
    });
  } catch (error) {
    console.error("Failed to find categories", error.message);
    res.status(500).json({ error: "Failed to find categories" });
  }
};

exports.singleCategory = async (req, res, next) => {
  const { categoryName } = req.params;

  try {
    const category = await Category.findOne({ name: categoryName }).populate(
      "products"
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const products = category.products;

    res.status(200).json({
      status: 200,
      message: `All products in ${categoryName} found`,
      data: products,
    });
  } catch (error) {
    console.error("Failed to find category", error.message);
    res.status(500).json({ error: "Failed to find category" });
  }
};
