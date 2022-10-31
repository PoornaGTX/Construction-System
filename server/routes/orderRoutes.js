const express = require("express");
const {
  addToOrder,
  getOrderAboveOneLakh,
} = require("../controllers/orderControllers");

const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/").post(authenticateUser, addToOrder);
module.exports = router;
