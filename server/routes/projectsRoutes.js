const express = require("express");
const { orderAPI } = require("../controllers/orderControllers");
const { getOrderAboveOneLakh, updateCart } = orderAPI();
const { projectAPI } = require("../controllers/ProjectController");
const {
  createProjects,
  getProjectDetails,
  deleteProject,
  updateProject,
  getProjects,
} = projectAPI();
const router = express.Router();

// router.get("/getProducts/:id", getSingleProduct);
router.get("/order", getOrderAboveOneLakh);
router.patch("/order/:id", updateCart);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);
router.post("/", createProjects);
router.get("/:email", getProjectDetails);
router.get("/", getProjects);

module.exports = router;
