const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Page");
});
router.use("/item", require("./item"));
router.use("/users", require("./user"));
router.use("/api", require("./api"));
router.use("/products", require("./products"));
// router.use("/api/inventory", require("./api/inventory"));

module.exports = router;
