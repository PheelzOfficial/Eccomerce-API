const express = require("express");
const controller = require("../controllers/categoryController");
const route = express.Router();

//this is to get all category
route.get("/", controller.allCategories);

//this is to get a single category
route.get("/:single-category", controller.singleCategory);

module.exports = route;
