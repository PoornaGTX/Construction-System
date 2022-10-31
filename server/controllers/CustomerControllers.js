const { StatusCodes } = require("http-status-codes");
const Cart = require("../modal/Carts");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const Product = require("../modal/Products");

const getAllProducts = async (req, res) => {
  // console.log(req.body);
  const products = await Product.find();
  res
    .status(200)
    .json({ products, totalProducts: products.length, numOfPages: 1 });
};

const addToCart = async (req, res) => {
  const carts = await Cart.create(req.body);
  res.status(200).json({ carts });
};

const getAllCart = async (req, res) => {
  const carts = await Cart.find({ createdBy: req.user.userId });
  res.status(200).json({ carts });
};
const clearCart = async (req, res) => {
  const carts = await Cart.deleteMany({ createdBy: req.user.userId });
  res.status(200).json({ carts });
};

const deleteCartItem = async (req, res) => {
  const { id: cartItemID } = req.params;
  const carts = await Cart.deleteOne({ _id: cartItemID });
  res.status(200).json({ carts });
};

module.exports = {
  getAllProducts,
  addToCart,
  getAllCart,
  clearCart,
  deleteCartItem,
};
