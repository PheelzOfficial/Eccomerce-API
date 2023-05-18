const User = require("../models/userModel");

//This route handles the Cart
exports.getCarts = async (req, res) => {
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

exports.getCart = async (req, res) => {
  const { userId } = req.userId;

  await User.findById(userId)
    .populate("cart")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or not logged in!" });
      }

      const cartProducts = user.cart;

      res.status(200).json({
        status: 200,
        message: "Cart Products Found !",
        data: cartProducts,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteCart = async (req, res) => {
  const { userId } = req.userId;
  const { productId } = req.params;

  User.findByIdAndUpdate(userId, { $pull: { favorites: productId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "Product removed from cart successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
