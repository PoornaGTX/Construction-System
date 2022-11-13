const { StatusCodes } = require("http-status-codes");
const Order = require("../modal/Order");
const Cart = require("../modal/Carts");
const mongoose = require("mongoose");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");

const orderAPI = () => {
  const addToOrder = async (req, res) => {
    const Orders = await Order.create(req.body);
    const deleteCart = await Cart.deleteMany({
      createdBy: mongoose.Types.ObjectId(req.user.userId),
    });
    res.status(200).json({ Orders });
  };

  const getOrderAboveOneLakh = async (req, res) => {
    const orders = await Order.find({ total: { $gt: 100000 } });
    return res.status(200).json({ orders });
  };

  const getAllCart = async (req, res) => {
    const carts = await Cart.find({});
    res.status(200).json({ carts });
  };
  const getAllOrders = async (req, res) => {
    const Orders = await Order.find({});
    res.status(200).json({ Orders });
  };

  const getOrderSummery = async (req, res) => {
    const Orders = await Order.find({
      createdBy: mongoose.Types.ObjectId(req.user.userId),
    });
    res.status(200).json({ Orders });
  };
  // //update cart
  const updateCart = async (req, res) => {
    const { id } = req.params;
    const { OrderStatus } = req.body;

    if (!OrderStatus) {
      throw new BadRequestError("Please Provide All Values.");
    }
    const order = await Order.find({ _id: id });
    if (!order) {
      throw new NotFoundError(`No Product found with id ${id}`);
    }
    const UpdatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { status: OrderStatus },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ UpdatedOrder });
  };
  return {
    addToOrder,
    getOrderAboveOneLakh,
    updateCart,
    getAllOrders,
    getOrderSummery,
  };
};

module.exports = { orderAPI };
