const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  console.log("returns list of products");
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
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, description } = req.body;
  // Check for existing product
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Make sure the user is updating their own product
  if (product.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  let fileData = {};
  if (req.file) {
    // Save to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
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
  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name: name || product.name,
      category: category || product.category,
      quantity: quantity || product.quantity,
      price: price || product.price,
      description: description || product.description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

const singleProduct = asyncHandler(async (req, res) => {
  const prodId = req.params.id;
  console.log(`returns product with  id ${prodId}`);
  const product = await Product.findById(prodId);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found!");
  }
  console.log(product);
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found!");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // Delete Product
  await Product.deleteOne(product);
  res.status(200).json({ message: "Product deleted" });
});

module.exports = {
  getProducts,
  createProduct,
  singleProduct,
  deleteProduct,
  updateProduct,
};
