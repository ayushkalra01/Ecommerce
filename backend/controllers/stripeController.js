const asyncHandler = require("express-async-handler");
const cartSchema = require("../models/cartModel");
const userSchema = require("../models/userModel");
const productSchema = require("../models/productModel");
const couponSchema = require("../models/couponModel");
const stripe = require("stripe")(
  "sk_test_51K4dy2SG264J1ES8sJvMXIuiAFs8I8nUuJRJcLqizQhPQAiXzZ8Hwek9LmyQIAEo2gFJneFfQ4ANCKnsin7kk3pT00x01OeY9x"
);

//@desc   Paymnet
//@routes POST /create-payment-intent
//@access PRIVATE
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { couponApplied } = req.body;

  const user = await userSchema.findOne({ email: req.user.email }).exec();
  const { cartTotal, totalAfterDiscount } = await cartSchema
    .findOne({ orderedBy: user._id })
    .exec();

  let finalTotal = 0;

  if (couponApplied && totalAfterDiscount) {
    finalTotal = Number(totalAfterDiscount) * 100;
  } else {
    finalTotal = Number(cartTotal) * 100;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalTotal,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalTotal,
  });
});

module.exports = {
  createPaymentIntent,
};
