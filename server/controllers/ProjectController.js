const Project = require("../modal/Projects");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors/index");
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
// //delete a product
// const deleteProduct = async (req, res) => {
//   const { id: pid } = req.params;
//   try {
//     const products = await Product.findOneAndDelete({
//       _id: pid,
//     });
//     res.status(200).send({ msg: products });
//   } catch (error) {
//     res.status(404).send({ msg: error });
//   }
// };
// //update a product
// const updateProduct = async (req, res) => {
//   const { id: pid } = req.params;
//   const { name, price, qty } = req.body;

//   if (!name || !price || !qty) {
//     throw new BadRequestError("Please Provide All Values.");
//   }
//   const product = await Product.find({ _id: pid });
//   console.log(product);
//   if (!product) {
//     throw new NotFoundError(`No Product found with id ${pid}`);
//   }
//   console.log(product.createdBy);
//   console.log(req.user.userId);
//   console.log(typeof req.user.userId);
//   console.log(typeof product.createdBy);
//   // //check permissions
//   // if (req.user.userId !== product.createdBy) {
//   //   throw new UnauthenticatedError("Not authorized to access this route");
//   // }
//   const UpdatedProduct = await Product.findOneAndUpdate(
//     { _id: pid },
//     req.body,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(200).send({ UpdatedProduct });
// };
//create a new product
const createProjects = async (req, res) => {
  const {
    projectName,
    projectLocation,
    projectEstimatedCost,
    projectDeadLine,
    projectManager,
  } = req.body;
  if (!projectName || !projectLocation || !projectEstimatedCost) {
    throw new BadRequestError("Please provide all values.");
  }
  const projects = await Project.create(req.body);
  console.log(projects);
  res.status(StatusCodes.OK).send({ projects });
};

module.exports = {
  createProjects,
  getProjects,
};
