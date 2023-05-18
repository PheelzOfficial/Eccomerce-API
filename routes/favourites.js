const express = require("express");
const controller = require("../controllers/favoriteController");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");


// This route requires authentication
router.get("/favourite/:productId", authenticateUser, controller.getFavourites);

router.post("/favourite/:productId",authenticateUser, controller.addFavourite);

//This route let you delete product from favourite
router.delete("/favorites/:productId", authenticateUser, controller.deleteFavourite);



module.exports = router;
