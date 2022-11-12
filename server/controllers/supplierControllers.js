const Product = require("../modal/Products");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
} = require("../errors/index");
const Order = require("../modal/Order");
//get all products
const getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .send({ products, totalProducts: products.length, numOfPages: 1 });
};

//get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id: pid } = req.params;
    const products = await Product.findOne({
      _id: pid,
    });
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { id: pid } = req.params;
  try {
    const products = await Product.findOneAndDelete({
      _id: pid,
    });
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};

//update a product
const updateProduct = async (req, res) => {
  const { id: pid } = req.params;
  const { name, price, qty, supplierName } = req.body;

  if (!name || !price || !qty || !supplierName) {
    throw new BadRequestError("Please Provide All Values.");
  }
  const product = await Product.find({ _id: pid });
  if (!product) {
    throw new NotFoundError(`No Product found with id ${pid}`);
  }

  const UpdatedProduct = await Product.findOneAndUpdate(
    { _id: pid },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).send({ UpdatedProduct });
};

//create a new product
const createProduct = async (req, res) => {
  const { qty, name, price, supplierName } = req.body;
  if (!qty || !name || !price || !supplierName) {
    throw new BadRequestError("Please provide all values.");
  }
  req.body.createdBy = req.user.userId;
  const products = await Product.create(req.body);
  res.status(StatusCodes.OK).send({ products });
};

const getMyOrders = async (req, res) => {

  const supplierName = req.body.name;
  const orderStatus = req.body.status;

  const orders = await Order.find({ status: orderStatus, 'cartproducts.supName': supplierName });

  res
    .status(StatusCodes.OK)
    .send({ orders, totalOrders: orders.length, numOfPages: 1 });
};

const qtyReducer = async (req, res) => {
  const dataArr = req.body;
  dataArr.map( async (pr)=>{
    const pro = await Product.find({ _id: pr.pid });
    if (pro) {
      const id = pr.pid
      const totalQty = pro[0].qty
     const newQty = totalQty-pr.qty
     const UpdatedPro = await Product.findByIdAndUpdate( { _id: id },{...pro, qty:newQty});
    console.log(pro);
    }
  })
};

module.exports = {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getMyOrders,
  qtyReducer
};
