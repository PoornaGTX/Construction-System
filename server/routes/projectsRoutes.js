const express = require("express");
const {
  getOrderAboveOneLakh,
  updateCart,
} = require("../controllers/orderControllers");

const {
  createProjects,
  getProjectDetails,
  deleteProject,
  updateProject,
  getProjects,
} = require("../controllers/ProjectController");

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
