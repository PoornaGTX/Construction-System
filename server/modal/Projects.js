const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectScheme = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectLocation: {
      type: String,
      required: true,
      trim: true,
    },
    projectEstimatedCost: {
      type: Number,
      required: true,
      trim: true,
    },
    projectManager: {
      type: String,
      required: true,
      trim: true,
    },
    projectDeadLine: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectScheme);

module.exports = Project;
