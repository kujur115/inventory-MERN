const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
  singleProduct,
  updateProduct,
} = require("../../controllers/productsController");
const protect = require("../../middleWare/authMiddleware");
const { upload } = require("../../utils/fileUpload");
const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.get("/", protect, getProducts);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/:id", protect, singleProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
