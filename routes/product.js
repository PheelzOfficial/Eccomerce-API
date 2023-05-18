// Create this endpoint below

// user   GET  ---> Returns a full list of the user
// user   POST  ---> Adds a new user to the system
// user/:id   GET  --->   GET Returns the data on a specific user
// user/:id   PATCH  --->   PUT Updates the data on a specific user

const express = require("express");
const controller = require("../controllers/productController");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.get("/all-products", controller.allProduct);

router.get("/single-product/:id", controller.singleProduct);

router.post("/post-product", controller.postProduct);

router.delete("/delete-product/:id", controller.deleteProduct);

router.patch("/update-product/:id", controller.updateProduct);

router.get("/search", searchController.search);

module.exports = router;
