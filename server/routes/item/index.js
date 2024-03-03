const express = require("express");
const ItemDetails = require("../../models/Item");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const items = await ItemDetails.findOne();
    return res.status(200).json({
      items: items,
      message: "items found",
    });
  } catch (error) {
    console.log("error fetching item", error);
    return res.status(500).json({
      data: null,
      message: "Error fetching items",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, price, supplier_info } = req.body;
    const item = await ItemDetails.create({
      name: name,
      price: price,
      supplier_info: supplier_info,
      mfgDate: Date.now(),
    });
    return res.status(200).json({
      data: item,
      message: "Item created successfully",
    });
  } catch (error) {
    console.log("error creating item", error);
    return res.status(500).json({
      data: null,
      message: "Error creating item",
    });
  }
});

module.exports = router;
