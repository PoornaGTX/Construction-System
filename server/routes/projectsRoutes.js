const express = require("express");

const {
  createProjects,
  getProjects,
  deleteProject,
} = require("../controllers/ProjectController");

const router = express.Router();

// router.get("/getProducts/:id", getSingleProduct);
router.delete("/:id", deleteProject);
// router.patch("/updateProducts/:id", updateProduct);
router.post("/", createProjects);
router.get("/", getProjects);

module.exports = router;
