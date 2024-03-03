const mongoose = require("mongoose");

const itemDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  supplier_info: {
    type: String,
    required: true,
  },
  mfgDate: {
    type: Date,
    required: true,
  },
  category: {
    ref: "Category",
    type: mongoose.Types.ObjectId,
  },
});

const ItemDetails = mongoose.model("Item", itemDetailSchema);
module.exports = ItemDetails;
