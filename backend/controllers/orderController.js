const asyncHandler = require("express-async-handler");
const cartSchema = require("../models/cartModel");
const userSchema = require("../models/userModel");
const productSchema = require("../models/productModel");
const orderSchema = require("../models/orderModel");
const uniqid = require("uniqid");

//@desc   Create Order
//@routes POST /api/order
//@access PRIVATE
const createOrder = asyncHandler(async (req, res) => {
  const { stripeResponse } = req.body;
  const user = await userSchema.findOne({ email: req.user.email }).exec();
  const { products } = await cartSchema.findOne({ orderedBy: user._id }).exec();

  const newOrder = await new orderSchema({
    products,
    paymentIntent: stripeResponse,
    orderedBy: user._id,
  }).save();

  // decrement quantity increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await productSchema.bulkWrite(bulkOption, {});
  res.status(201).json(newOrder);
});

//@desc   Get user Orders
//@routes GET /api/order
//@access PRIVATE
const getOrders = asyncHandler(async (req, res) => {
  const user = await userSchema.findOne({ email: req.user.email }).exec();
  const orders = await orderSchema
    .find({ orderedBy: user._id })
    .populate("products.product")
    .exec();
  res.json(orders);
});

//@desc   Get All Orders
//@routes GET /api/order/all
//@access PRIVATE/ADMIN
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderSchema
    .find({})
    .sort({ createdAt: -1 })
    .populate("products.product")
    .exec();
  res.json(orders);
});

//@desc   Update Order Status
//@routes PUT /api/order
//@access PRIVATE/ADMIN
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, orderStatus } = req.body;
  const order = await orderSchema
    .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
    .exec();
  res.json(order);
});

//@desc   Create Cash on delivery Order
//@routes POST /api/order/cod
//@access PRIVATE
const createCodOrder = asyncHandler(async (req, res) => {
  const { applyCoupon } = req.body;
  const user = await userSchema.findOne({ email: req.user.email }).exec();
  const cart = await cartSchema.findOne({ orderedBy: user._id }).exec();

  let finalTotal = 0;
  if (applyCoupon && cart.totalAfterDiscount) {
    finalTotal = cart.totalAfterDiscount * 100;
  } else {
    finalTotal = cart.cartTotal * 100;
  }

  const newOrder = await new orderSchema({
    products: cart.products,
    paymentIntent: {
      id: uniqid(),
      amount: finalTotal,
      currency: "inr",
      status: "Not Processed",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderedBy: user._id,
    orderStatus: "Not Processed",
  }).save();

  // decrement quantity increment sold
  let bulkOption = cart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await productSchema.bulkWrite(bulkOption, {});
  res.status(201).json(newOrder);
});

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
  updateStatus,
  createCodOrder,
};
