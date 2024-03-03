const express = require("express");

const router = express.Router();
const inventoryApi = require("../../../controllers/inventory_api");

router.get("/", inventoryApi.index);
router.post("/add", inventoryApi.create);
router.get("/:id", inventoryApi.view);
router.delete("/:id", inventoryApi.delete);
router.post("/:id", inventoryApi.update);

module.exports = router;
