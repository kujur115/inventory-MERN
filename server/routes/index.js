const express = require("express");
const router = express.Router();

router.use("/item", require("./item"));
router.use("/api/inventory", require("./api/inventory"));

module.exports = router;
