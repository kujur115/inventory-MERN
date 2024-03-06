const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserDB",
    },
    name: {
      type: String,
      required: [true, "Please add a name for the product"],
      trim: true,
    },
    category: {
      type: String,
      require: [true, "Please add a category for the product"],
      enum: ["Electronics", "Furniture", "Books"],
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity for the product"],
      validate(value) {
        if (isNaN(value)) return false;
        return Number(value) > 0;
      },
    },
    price: {
      type: String,
      required: [true, "Please add a price for the product"],
      validate(value) {
        var checker = /^\d+(\.\d{1,2})?$/;

        if (!checker.test(value)) {
          throw new Error("Price must be in format X99 or X99.99");
        } else return true;
      },
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
