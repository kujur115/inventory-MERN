const express = require("express");
const { getProducts, createProduct } = require("../../controllers/productsController");
const protect = require("../../middleWare/authMiddleware");
const router = express.Router();


router.post("/", protect, createProduct);
router.get("/", protect, getProducts);

module.exports = router;
