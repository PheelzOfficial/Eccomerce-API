const express = require("express");
const controller = require("../controllers/productController");
const searchController = require("../controllers/searchController");
const router = express.Router();

//Returns a full list of the products available
router.get("/all-products", controller.allProduct);

router.get("/single-product/:id", controller.singleProduct);

//Adds a new product to the database
router.post("/post-product", controller.postProduct);

//removes a product from the database
router.delete("/delete-product/:id", controller.deleteProduct);

//this updates the product in the database
router.patch("/update-product/:id", controller.updateProduct);

//this helps to filter products
router.get("/search/:title", searchController.search);

module.exports = router;
