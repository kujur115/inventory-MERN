const express = require("express");

const router = express.Router();
const inventoryApi = require("../../../controller/inventory_api");

router.get("/", inventoryApi.index);
router.post("/create", inventoryApi.create);
router.get("/:id", inventoryApi.view);
router.delete("/:id", inventoryApi.destroy);
router.post("/:id", inventoryApi.update);

module.exports = router;
