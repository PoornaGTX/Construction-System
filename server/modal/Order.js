const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderScheme = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
      unique: false,
    },
    cartproducts: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderScheme);

module.exports = Order;
