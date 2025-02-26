const express = require("express");

const { supplierAPI } = require("../controllers/supplierControllers");
const {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getMyOrders,
  qtyReducer,
} = supplierAPI();
const router = express.Router();

router.get("/getProducts", getProducts);
router.get("/getProducts/:id", getSingleProduct);
router.delete("/deleteProducts/:id", deleteProduct);
router.post("/createProduct", createProduct);
router.patch("/updateProducts/:id", updateProduct);
router.route("/getMyOrders").post(getMyOrders);
router.patch("/reduceProductQty", qtyReducer);

module.exports = router;
