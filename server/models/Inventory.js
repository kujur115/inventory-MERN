const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  supplier: {
    type: String,
    required: true,
  },
  mfgDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
