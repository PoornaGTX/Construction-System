const express = require("express");
const {
  getAllProducts,
  getAllCart,
  addToCart,
  clearCart,
  deleteCartItem,
} = require("../controllers/CustomerControllers");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.route("/Products").get(getAllProducts);
router.route("/cart").get(authenticateUser, getAllCart);
router.route("/cart").post(authenticateUser, addToCart);
router.route("/cart/:id").delete(deleteCartItem);

module.exports = router;
