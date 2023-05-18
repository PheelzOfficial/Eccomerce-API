const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user");
const Products = require("./routes/product");
const Cart = require("./routes/cart");
const Favourites = require("./routes/favourites");
const Checkout = require("./routes/checkout");
const Category = require("./routes/category");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
// const session = require("express-session");

// Initialize Express app
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false, // Set to true if using HTTPS
//       maxAge: 3600000, // Cookie expiration time (in milliseconds)
//     },
//   })
// );

// Connect to MongoDB


mongoose
  .connect("mongodb://127.0.0.1/ECommerceApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// global error

// cors
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
app.use(cookieParser());

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", Products);
app.use("/api/v1/category", Category);
app.use("/api/v1/user", Cart);
app.use("/api/v1/user", Favourites);
app.use("/api/v1/user", Checkout);

/// used for error handling  ...  used below the routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "url not found ",
    message: "CAN'T FIND URL " + req.originalUrl,
  });
  const err = new Error("can't find this url");
  err.status = "fail";
  err.statusCode = 404;
  // next(new AppError('cant find this url', 404))
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
