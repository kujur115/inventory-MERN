const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

module.exports = { getProducts };
