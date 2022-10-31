const { StatusCodes } = require("http-status-codes");
const Order = require("../modal/Order");
const Cart = require("../modal/Carts");

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
  const deleteCart = await Cart.deleteMany({
    createdBy: req.user.userId,
  });
  res.status(200).json({ Orders });
};

const getAllOrders = async (req, res) => {
  const Orders = await Order.find({});
  res.status(200).json({ Orders });
};

module.exports = {
  addToOrder,
  getAllOrders,
};
