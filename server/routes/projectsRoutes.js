const express = require("express");

const {
  createProjects,
  getProjectDetails,
} = require("../controllers/ProjectController");

const router = express.Router();

// router.get("/getProducts", getProducts);
// router.get("/getProducts/:id", getSingleProduct);
// router.delete("/deleteProducts/:id", deleteProduct);
// router.patch("/updateProducts/:id", updateProduct);
router.post("/", createProjects);
router.get("/", getProjectDetails);

module.exports = router;
