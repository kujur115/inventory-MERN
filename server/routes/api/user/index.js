const express = require("express");

const router = express.Router();
const userApi = require("../../../controller/user_api");

router.post("/login", userApi.createSession);
router.post("/signup", userApi.registerUser);
router.post("/admin/signup", userApi.registerAdmin);

module.exports = router;
