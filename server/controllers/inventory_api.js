const Inventory = require("../models/Inventory");

module.exports.index = async (req, res) => {
  try {
    let items = await Inventory.find({});
    return res.status(200).json({
      message: " return all the items in inventory",
      items: items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while loading inventory",
      error: error,
    });
  }
};

module.exports.create = async (req, res) => {
  try {
    const { invoice, name, price, supplier, qty, category } = req.body;

    const item = await Inventory.create({
      invoice,
      name,
      price,
      supplier,
      qty,
      category,
      mfgDate: new Date.now(),
      status: true,
    });

    return res.status(200).json({
      data: item,
      message: "Successfully created item in inventory",
    });
  } catch (error) {
    console.log("error creating item", error);
    return res.status(500).json({
      data: null,
      message: "Error creating item",
      error: error,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Inventory.deleteOne({ id: req.params.id });
    return res.status(200).json({
      message: "Successfully deleted item",
    });
  } catch (error) {
    console.log("error deleting item", error);
    return res.status(500).json({
      message: "Error deleting item",
      error: error,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    let item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        error: { message: "Item not found", id: req.params.id },
      });
    }
    const { name, price, supplier, qty, category } = req.body;
    item = await Inventory.updateOne(
      { id: item.id },
      {
        name: name,
        price: price,
        supplier: supplier,
        qty: qty,
        category: category,
      }
    );

    return res.status(200).json({
      message: "Successfully updated item",
      data: { item: item },
    });
  } catch (error) {
    console.log("error updating item", error);
    return res.status(500).json({
      message: "Error updating item",
      error: error,
    });
  }
};

module.exports.view = async (req, res) => {
  try {
    let item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        error: { message: "Item not found", id: req.params.id },
      });
    }

    return res.status(200).json({
      message: "Successfully fetched item",
      data: { item: item },
    });
  } catch (error) {
    console.log("error fetching item", error);
    return res.status(500).json({
      message: "Error fetching item",
      error: error,
    });
  }
};
