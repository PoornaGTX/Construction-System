const { StatusCodes } = require("http-status-codes");
const Order = require("../modal/Order");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");

// const getAllProducts = async (req, res) => {
//   // console.log(req.body);
//   const products = await Product.find();
//   res
//     .status(200)
//     .json({ products, totalProducts: products.length, numOfPages: 1 });
// };

const addToOrder = async (req, res) => {
  const Orders = await Order.create(req.body);
  res.status(200).json({ Orders });
};

const getAllCart = async (req, res) => {
  const carts = await Cart.find({});
  res.status(200).json({ carts });
};

module.exports = {
    addToOrder,
};
