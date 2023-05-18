const express = require("express");
const router = express.Router();
const controller = require("../controllers/checkoutController");
const authenticateUser = require("../middleware/authMiddleware");

//This route handles the product checkout routes
router.post("/:product", authenticateUser, controller.checkout);

//This route handles the product getting added to the list of products that have been checked out
router.post("/callback", authenticateUser, controller.callback);

//This route handles all the products that have been checkout successfully
router.get(
  "/checked-out-products",
  authenticateUser,
  controller.getCheckedOutProducts
);


module.exports = router;