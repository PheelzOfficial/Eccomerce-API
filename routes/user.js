// Create this endpoint below

// user   GET  ---> Returns a full list of the user
// user   POST  ---> Adds a new user to the system
// user/:id   GET  --->   GET Returns the data on a specific user
// user/:id   PATCH  --->   PUT Updates the data on a specific user

const express = require("express");
const controller = require("../controllers/userAuthController");
const passwordController = require("../controllers/passwordUpdateController");

const router = express.Router();

router.post("/register", controller.CreateUsers);

router.post("/login", controller.loginUser);
router.get("/signout", controller.signout);
router.get("/all-user", controller.allUser);
router.get("/single-user/:id", controller.singleUser);

//this handles the password change route, in which you pass in the email, currentPassword and the newPassword
router.patch("/update-password", passwordController.passwordUpdate);

// Protected API endpoint
router.get("/protected", controller.protected);

module.exports = router;
