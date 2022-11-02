const express = require("express");
const {
  addToOrder,
  getAllOrders,
  getOrderSummery,
} = require("../controllers/orderControllers");

const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/").post(authenticateUser, addToOrder);
router.route("/").get(authenticateUser, getOrderSummery);
module.exports = router;
