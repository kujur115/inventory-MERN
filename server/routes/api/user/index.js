const express = require("express");

const router = express.Router();
const userApi = require("../../../controller/user_api");

router.post("/login", userApi.createSession);

module.exports = router;
