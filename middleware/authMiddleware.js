const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Middleware for JWT authentication
function authenticateUser(req, res, next) {
  // Check if the user is authenticated
  const token = req.cookies.token;

  // Verify if the token is present in the cookie
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify and decode the token to extract the user ID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
    const userId = decodedToken.userId;

    // Assign the userId to the request object
    req.userId = userId;

    // User is authenticated, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateUser;
