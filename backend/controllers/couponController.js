const asyncHandler = require("express-async-handler");
const couponSchema = require("../models/couponModel");

//@desc   Create Coupon
//@routes POST /api/coupon
//@access PRIVATE/ADMIN
const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiry, discount } = req.body.coupon;
  const newCoupon = await new couponSchema({ name, expiry, discount }).save();
  res.json(newCoupon);
});
//@desc   Remove Coupon
//@routes DELETE /api/coupon/:id
//@access PRIVATE/ADMIN
const deleteCoupon = asyncHandler(async (req, res) => {
  await couponSchema.findByIdAndDelete(req.params.id).exec();
  res.json({ success: true });
});

//@desc   get all Coupons
//@routes GET /api/coupon/all
//@access PUBLIC
const getAllCoupon = asyncHandler(async (req, res) => {
  const coupons = await couponSchema.find({}).sort({ createdAt: -1 });
  res.json(coupons);
});

module.exports = {
  createCoupon,
  deleteCoupon,
  getAllCoupon,
};
