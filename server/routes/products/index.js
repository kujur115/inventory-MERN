const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
  singleProduct,
  updateProduct,
} = require("../../controllers/productsController");
const protect = require("../../middleWare/authMiddleware");
const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.patch("/:id", protect, updateProduct);
router.get("/:id", protect, singleProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
