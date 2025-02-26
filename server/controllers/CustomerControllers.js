const { StatusCodes } = require("http-status-codes");
const Cart = require("../modal/Carts");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const Product = require("../modal/Products");

const getAllProducts = async (req, res) => {
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
  try {
    const carts = await Cart.deleteOne({ _id: cartItemID });
    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(400).json({ carts: [], msg: error });
  }
};

const updateCartItem = async (req, res) => {
  const { id: cartItemID } = req.params;

  const { CartData } = req.body;
  console.log("====================================");
  console.log(cartItemID);
  console.log("====================================");

  const carts = await Cart.findOneAndUpdate({ _id: cartItemID }, req.body);
  res.status(StatusCodes.OK).json({ carts });
};

module.exports = {
  getAllProducts,
  addToCart,
  getAllCart,
  clearCart,
  deleteCartItem,
  updateCartItem,
};
