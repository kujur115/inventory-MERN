const express = require("express");
const { getProducts } = require("../../controllers/productsController");
const protect = require("../../middleWare/authMiddleware");
const router = express.Router();


router.get("/", protect, getProducts);

module.exports = router;
