const Product = require("../models/productModel");

exports.postProduct = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files were uploaded" });
    }

    // Handle images
    let images = [];
    if (req.files.images) {
      const imageFiles = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      images = imageFiles.map((image) => {
        const fileName = Date.now() + "-" + image.name;
        image.mv("public/uploads/images/" + fileName);
        return fileName;
      });
    }

    // Handle videos
    let videos = [];
    if (req.files.videos) {
      const videoFiles = Array.isArray(req.files.videos)
        ? req.files.videos
        : [req.files.videos];
      videos = videoFiles.map((video) => {
        const fileName = Date.now() + "-" + video.name;
        video.mv("public/uploads/videos/" + fileName);
        return fileName;
      });
    }

    // Create a new product in the database
    const newProduct = Product.create({
      title: req.body.title,
      price: req.body.price,
      brand: req.body.brand,
      size: req.body.size,
      colour: req.body.colour,
      sizeAndFit: req.body.sizeAndFit,
      modelHeight: req.body.modelHeight,
      modelWearing: req.body.modelWearing,
      lookAfterMe: req.body.lookAfterMe,
      aboutMe: req.body.aboutMe,
      style: req.body.style,
      images: images,
      video: videos,
      productType: req.body.productType,
      category: req.body.category,
      bodyFit: req.body.bodyFit,
    });
    res.status(201).json({
      status: 200,
      message: "PRODUCT uploaded successfully",
      // data: {
      //   user: newProduct,
      // },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 400,
      message: "Failed to upload product",
    });
  }
};

exports.allProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 200,
      message: "All Product found !",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        status: 404,
        error: "Product not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Product found !",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "internal server error !",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Failed to delete the product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  // const productId = id.toString(),
  // const product = await Product.
  await Product.findByIdAndUpdate(id.toString(), {
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    size: req.body.size,
    colour: req.body.colour,
    sizeAndFit: req.body.sizeAndFit,
    modelHeight: req.body.modelHeight,
    modelWearing: req.body.modelWearing,
    lookAfterMe: req.body.lookAfterMe,
    aboutMe: req.body.aboutMe,
    style: req.body.style,
    images: req.body.body,
    vidoe: req.body.video,
    productType: req.body.productType,
    category: req.body.category,
    bodyFit: req.body.bodyFit,
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    })
    .catch((error) => {
      console.error("Failed to update product:", error.message);
      res.status(500).json({ error: "Failed to update product" });
    });
};
