const express = require("express");

const { createProjects } = require("../controllers/ProjectController");

const router = express.Router();

// router.get("/getProducts", getProducts);
// router.get("/getProducts/:id", getSingleProduct);
// router.delete("/deleteProducts/:id", deleteProduct);
// router.patch("/updateProducts/:id", updateProduct);
router.post("/", createProjects);

module.exports = router;
