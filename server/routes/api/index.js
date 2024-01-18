const express = require("express");
const router = express.Router();
const Auth = require("../../config/middleware");

router.use("/user", require("./user"));
router.use("/inventory",Auth.authenticateToken, require("./inventory"));

module.exports = router;
