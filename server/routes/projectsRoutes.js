const express = require("express");

const {
  createProjects,
  getProjects,
} = require("../controllers/ProjectController");

const router = express.Router();

// router.get("/getProducts/:id", getSingleProduct);
// router.delete("/deleteProducts/:id", deleteProduct);
// router.patch("/updateProducts/:id", updateProduct);
router.post("/", createProjects);
router.get("/", getProjects);

module.exports = router;
