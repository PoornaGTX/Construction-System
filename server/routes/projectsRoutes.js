const express = require("express");

const {
  createProjects,
  getProjectDetails,
  deleteProject,
  updateProject,
} = require("../controllers/ProjectController");

const router = express.Router();

// router.get("/getProducts/:id", getSingleProduct);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);
router.post("/", createProjects);
router.get("/:email", getProjectDetails);

module.exports = router;
