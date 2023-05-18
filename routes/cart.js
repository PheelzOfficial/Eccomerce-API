const express = require("express");
const controller = require("../controllers/cartController");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

// This route requires authentication
router.get("/cart/:productId",authenticateUser, controller.getCarts);

//This route help to remove product from cart
router.delete("/cart/:productId", authenticateUser, controller.deleteCart);

module.exports = router;