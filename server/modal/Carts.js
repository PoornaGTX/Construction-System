const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
      unique: false,
    },
    pid: {
      type: String,
      required: [true, "Please provide pid"],
      // unique: [true, "Product is already in the cart"],
    },
    total: {
      type: Number,
      required: true,
    },
    userQty: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartScheme);

module.exports = Cart;
