import express from "express";
const router = express.Router();

import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

router.route("/").post(createSubject);
router.route("/").get(getAllSubjects);
router.route("/:id").patch(updateSubject);
router.route("/:id").delete(deleteSubject);

export default router;
