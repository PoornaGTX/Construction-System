const Project = require("../modal/Projects");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/index");
const User = require("../modal/Users");
//get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({});
  res
    .status(StatusCodes.OK)
    .send({ projects, totalProjects: projects.length, numOfPages: 1 });
};
// //get single product
// const getSingleProduct = async (req, res) => {
//   try {
//     const { id: pid } = req.params;
//     const products = await Product.findOne({
//       _id: pid,
//     });
//     res.status(200).send({ msg: products });
//   } catch (error) {
//     res.status(404).send({ msg: error });
//   }
// };
//delete a product
const deleteProject = async (req, res) => {
  const { id: pid } = req.params;
  try {
    const projects = await Project.findOneAndDelete({
      _id: pid,
    });
    res.status(200).send({ msg: projects });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};
// //update a project
const updateProject = async (req, res) => {
  const { id: pid } = req.params;
  const {
    projectName,
    projectLocation,
    projectEstimatedCost,
    projectDeadLine,
    projectManager,
  } = req.body;

  if (
    !projectName ||
    !projectLocation ||
    !projectEstimatedCost ||
    !projectDeadLine
  ) {
    throw new BadRequestError("Please Provide All Values.");
  }
  const project = await Project.find({ _id: pid });
  console.log(project);
  if (!project) {
    throw new NotFoundError(`No Product found with id ${pid}`);
  }
  const UpdatedProject = await Project.findOneAndUpdate(
    { _id: pid },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  const UpdateUser = await User.findOneAndUpdate(
    { email: projectManager },
    { allocatedProjectId: pid, allocatedProject: projectName },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).send({ UpdatedProject });
};
//create a new project
const createProjects = async (req, res) => {
  const {
    projectName,
    projectLocation,
    projectEstimatedCost,
    projectDeadLine,
    projectManager,
  } = req.body;
  if (
    !projectName ||
    !projectLocation ||
    !projectEstimatedCost ||
    !projectManager
  ) {
    throw new BadRequestError("Please provide all values.");
  }
  const projects = await Project.create(req.body);
  // console.log(projects);

  const UpdateUser = await User.findOneAndUpdate(
    { email: projectManager },
    {
      allocatedProjectId: projects._id,
      allocatedProject: projects.projectName,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).send({ projects });
};

module.exports = {
  createProjects,
  getProjects,
  deleteProject,
  updateProject,
};
