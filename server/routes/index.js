const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home Page");
});
router.use("/item", require("./item"));
router.use("/api", require("./api"));
// router.use("/api/inventory", require("./api/inventory"));

module.exports = router;
