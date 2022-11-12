const express = require("express");

const { supplierAPI } = require("../controllers/supplierControllers");
const {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getMyOrders,
} = supplierAPI();
const router = express.Router();

router.get("/getProducts", getProducts);
router.get("/getProducts/:id", getSingleProduct);
router.delete("/deleteProducts/:id", deleteProduct);
router.post("/createProduct", createProduct);
router.patch("/updateProducts/:id", updateProduct);
router.route("/getMyOrders").post(getMyOrders);

module.exports = router;
