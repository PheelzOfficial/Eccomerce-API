const axios = require("axios");
const Checkout = require("../models/checkoutModel");

//this function hold the checkout logic for every product
exports.checkout = async (req, res, next) => {
  const productId = req.params.product;

  try {
    const { amount, email } = req.body;
    const userId = req.userId;

    const callbackUrl = "http://localhost:3000/user/callback"; // Replace with your actual callback URL

    // Make a request to Paystack's initialize transaction API
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100, // Amount in kobo (multiply by 100 for Naira)
        email,
        callback_url: callbackUrl,
        userId,
      },
      {
        headers: {
          Authorization: "Bearer YOUR_PAYSTACK_SECRET_KEY", // Replace with your Paystack secret key
        },
      }
    );

    const authorizationUrl = response.data.data.authorization_url;

    // Return the authorization URL to the client
    res.json({
      authorizationUrl,
      productId,
      userId,
    });
  } catch (error) {
    console.error("Error creating Paystack transaction:", error.message);
    res.status(500).json({ error: "Failed to create Paystack transaction" });
  }
};

//callback controller
exports.callback = async (req, res, next) => {
  try {
    const { reference } = req.query;

    // Verify the payment status with Paystack using the reference
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: "Bearer YOUR_PAYSTACK_SECRET_KEY", // Replace with your Paystack secret key
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      const { productId, userId } = req.query;

      // Save the product using the checkout schema
      const checkout = new Checkout({
        user: userId,
        products: [{ product: productId, quantity: 1 }], // Adjust the product data as needed
      });

      await checkout.save();

      res.status(200).json({ message: "Payment successful", checkout });
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error processing payment callback:", error.message);
    res.status(500).json({ error: "Failed to process payment callback" });
  }
};

exports.getCheckedOutProducts = async (req, res) => {
  try {
    const userId = req.cookies.userId; // Assuming the user ID is stored in a cookie named "userId"

    const checkoutData = await Checkout.find({ userId })
      .populate("products.product")
      .select("-__v");

    res.status(200).json({ data: checkoutData });
  } catch (error) {
    console.error("Error retrieving checkout data:", error.message);
    res.status(500).json({ error: "Failed to retrieve checkout data" });
  }
};
