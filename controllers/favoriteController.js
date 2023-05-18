const User = require("../models/userModel");
// const authenticateUser = require("../middleware/authMiddleware");


//This route handles the Cart
exports.addFavourite = async (req, res) => {
  // const userId = req.session.token;
  const { userId } = req.userId;
  const { productId } = req.body;

  Cart.findOneAndUpdate(
    { user: userId },
    { $addToSet: { products: productId } },
    { upsert: true, new: true }
  )
    .populate("products")
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getFavourites = async (req, res) => {
  const { userId } = req.userId;

  await User.findById(userId)
    .populate("favorites")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or not logged in!" });
      }

      const favoriteProducts = user.favorites;

      res.json({
        status: 200,
        message: "Favourite Products found!",
        data: favoriteProducts,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteFavourite = async (req, res) => {
  const { userId } = req.userId;
  const { productId } = req.params;

  User.findByIdAndUpdate(userId, { $pull: { favorites: productId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "Product removed from favorites successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
