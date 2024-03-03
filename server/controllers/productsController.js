const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.file);
  const { name, category, quantity, price, description } = req.body;

  // Validation
  if (!name || !category || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  // Create product
  const createdProduct = await Product.create({
    user: req.user.id,
    name,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });
  if (!createdProduct) {
    res.status(500);
    throw new Error("Error adding Product");
  }
  res.status(200).json(createdProduct);
});

module.exports = { getProducts, createProduct };
