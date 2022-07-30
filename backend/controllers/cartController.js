const asyncHandler = require("express-async-handler");
const cartSchema = require("../models/cartModel");
const userSchema = require("../models/userModel");
const productSchema = require("../models/productModel");
const couponSchema = require("../models/couponModel");

//@desc   Save Cart Items
//@routes POST /api/cart
//@access PRIVATE
const saveUserCartItems = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  let items = [];
  const user = await userSchema.findOne({ email: req.user.email }).exec();

  const alreadyHaveCartItems = await cartSchema
    .findOne({ orderedBy: user._id })
    .exec();
  if (alreadyHaveCartItems) {
    alreadyHaveCartItems.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = Number(cart[i].count);
    object.color = cart[i].color;
    const productFromDb = await productSchema
      .findOne({ slug: cart[i].slug })
      .select("price")
      .exec();
    object.price = productFromDb.price;
    items.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < items.length; i++) {
    cartTotal = cartTotal + items[i].price * items[i].count;
  }

  const newCart = await new cartSchema({
    products: items,
    cartTotal,
    orderedBy: user._id,
  }).save();
  res.json({ success: true });
});

//@desc   Get Cart Items
//@routes GET /api/cart
//@access PRIVATE
const getUserCartItems = asyncHandler(async (req, res) => {
  const user = await userSchema.findOne({ email: req.user.email }).exec();
  const cartItems = await cartSchema
    .findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  const { products, cartTotal, totalAfterDiscount } = cartItems;
  res.json({ products, cartTotal, totalAfterDiscount });
});

//@desc   Delete Cart Items
//@routes DELETE /api/cart
//@access PRIVATE
const deleteUserCartItems = asyncHandler(async (req, res) => {
  const user = await userSchema.findOne({ email: req.user.email }).exec();
  await cartSchema.findOneAndRemove({ orderedBy: user._id });
  res.json({ success: true });
});

//@desc   Save Cart Items
//@routes POST /api/cart/address
//@access PRIVATE
const saveUserShippingAddress = asyncHandler(async (req, res) => {
  const user = await userSchema
    .findOneAndUpdate({ email: req.user.email }, { address: req.body.address })
    .exec();
  res.json({ success: true });
});

//@desc   Apply coupon
//@routes POST /api/cart/coupon
//@access PRIVATE
const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await couponSchema.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    res.json({ err: `Invalid ${coupon} Coupon` });
    return;
  }

  const expiryDate = validCoupon.expiry;
  const today = new Date();

  if (today.getTime() > expiryDate.getTime()) {
    res.json({ err: `Coupon ${coupon} Expired` });
    return;
  }

  const user = await userSchema.findOne({ email: req.user.email }).exec();
  let { products, cartTotal } = await cartSchema
    .findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price");

  const totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await cartSchema
    .findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    )
    .exec();

  res.json(totalAfterDiscount);
});

module.exports = {
  saveUserCartItems,
  getUserCartItems,
  deleteUserCartItems,
  saveUserShippingAddress,
  applyCoupon,
};
