const express = require("express");

const {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/supplierControllers");

const router = express.Router();

router.get("/getProducts", getProducts);
router.get("/getProducts/:id", getSingleProduct);
router.delete("/deleteProducts/:id", deleteProduct);
router.post("/createProduct", createProduct);
router.patch("/updateProducts/:id", updateProduct);

module.exports = router;