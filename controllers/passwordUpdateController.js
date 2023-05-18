const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.passwordUpdate = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Find the user in the database
    const currentUser = await User.findOne({ email: email });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the current password
    await bcrypt.compare(
      currentPassword,
      currentUser.password,
      (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: "Invalid current password" });
        }

        // Generate salt and hash the new password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error occurred during password update" });
          }

          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error occurred during password update" });
            }

            // Update the user's password
            currentUser.password = hash;
            res.json({ message: "Password updated successfully" });
          });
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
