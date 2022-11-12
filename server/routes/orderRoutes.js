const express = require("express");

const { orderAPI } = require("../controllers/orderControllers");
const {
  getOrderAboveOneLakh,
  updateCart,
  addToOrder,
  getAllOrders,
  getOrderSummery,
} = orderAPI();

const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/").post(authenticateUser, addToOrder);
router.route("/").get(authenticateUser, getOrderSummery);
router.route("/").get(getAllOrders);

module.exports = router;
