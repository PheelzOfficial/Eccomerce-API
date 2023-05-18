const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.allUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
  }
};

exports.singleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const singleUser = await User.findOne({ _id: userId });
    res.status(200).json({
      message: "User Found !",
      data: {
        user: singleUser,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.CreateUsers = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      interest,
      defaultAndSale,
      newStuff,
      yourExclusives,
      asosPartner,
      dateOfBirth,
    } = req.body;

    const inputPassword = password.toString();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(inputPassword, 10);
    // console.log(hashedPassword);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      interest,
      defaultAndSale,
      newStuff,
      yourExclusives,
      asosPartner,
      dateOfBirth,
    });

    const foundId = newUser._id;

    const token = jwt.sign({ foundId }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    // req.session.token = token;

    res.status(201).json({
      status: 200,
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 400,
      error: "Something went wrong",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const passwordInput = password.toString();

  try {
    // Find the user by email
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the user document
    const passwordMatch = await bcrypt.compare(
      passwordInput,
      currentUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const userId = currentUser._id;
    const token = jwt.sign({ userId }, "your-secret-key", {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    // req.session.token = token;

    // Successful login
    res.status(200).json({
      message: "Login successful",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

exports.signout = async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

// Protected API endpoint
exports.protected = async (req, res) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Token is valid, can proceed with the protected operation
    res.json({ message: "Protected API endpoint", user: decoded.username });
  });
};
